import { envs } from "../../../config/envs.js";
import type { LoginUserUseCase } from "../interfaces/login-use-case.js";
import type { UserRepository } from "../../../domain/user/repository.js";
import type { CartRepository } from "../../../domain/cart/repository.js";
import type { ProductRepository } from "../../../domain/product/repository.js";
import { LoginUserDTO } from "../../../presentation/user/dtos/input/login.js";
import { TemporaryCartItemDTO } from "../../../presentation/cart/dtos/input/temporary-item.js";
import { UserResponseDTO } from "../../../presentation/user/dtos/output/response.js";
import { LoginResponseDTO } from "../../../presentation/auth/dtos/output/login-response.js";
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";
import type { JWTGenerator } from "../interfaces/jwt-generator.js";
import type { PasswordHasher } from "../../user/interfaces/password-hasher.js";
import { CartItemEntity } from "../../../domain/cartItem/entity.js";
import { AuthenticationError } from "../errors/authenticationError.js";

export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly cartRepository: CartRepository,
        private readonly productRepository: ProductRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly jwt: JWTGenerator,
    ) {}

    public async execute(loginUserDTO: LoginUserDTO, temporaryCart?: TemporaryCartItemDTO[]): Promise<LoginResponseDTO> {
        
        const user = await this.userRepository.getByEmail(loginUserDTO.email);
        if (user === null) throw new AuthenticationError('El correo o la contraseña es incorrecto.');

        const isPasswordValid = await this.passwordHasher.compare(loginUserDTO.password, user.password);
        if (!isPasswordValid) throw new AuthenticationError('El correo o la contraseña es incorrecto.');

        const accessToken = this.jwt.generateToken( 
            { id: user.id!, role: user.role! }, 
            envs.JWT_SECRET_KEY, 
            { expiresIn: '15m' }
        )

        const refreshToken = this.jwt.generateToken(  
            { id: user.id!, role: user.role! }, 
            envs.JWT_SECRET_KEY, 
            { expiresIn: '7d' }
        )

        let userToReturn = user;

        if (temporaryCart && temporaryCart.length > 0) {
            for (const item of temporaryCart) {
                try {
                    const cartItem = CartItemEntity.create({
                        id: null,
                        cartId: user.cart!.id!,
                        productId: item.productId,
                        quantity: item.quantity,
                        product: await this.productRepository.getById(item.productId),
                    });

                    await this.cartRepository.addItem(cartItem);
                } catch (error) {
                    console.error(`No se pudo agregar el item correspondiente al producto con ID ${item.productId}:`, error);
                }
            }
            
            userToReturn = await this.userRepository.getById(user.id!);    
        }
        
        return new LoginResponseDTO(
            UserResponseDTO.fromEntity(userToReturn), 
            accessToken,
            refreshToken, 
            CartResponseDTO.fromEntity(userToReturn.cart!)
        );
    }

}