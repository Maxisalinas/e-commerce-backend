import { envs } from "../../../config/envs.js";
import { UserRepository } from "../../../domain/user/repository.js";
import type { LoginUserUseCase } from "../interfaces/login-use-case.js";
import { LoginUserDTO } from "../../../presentation/user/dtos/input/login.js";
import { UserResponseDTO } from "../../../presentation/user/dtos/output/response.js";
import type { LoginResponseDTO } from "../../../presentation/auth/dtos/output/loginResponse.js";
import { AuthenticationError } from "../../errors/authenticationError.js";
import type { JWTGenerator } from "../interfaces/jwt-generator.js";
import type { PasswordHasher } from "../../user/interfaces/password-hasher.js";

export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly jwt: JWTGenerator
    ) {}

    public async execute(loginUserDTO: LoginUserDTO): Promise<LoginResponseDTO> {

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
        
       const userLogged: LoginResponseDTO = { 
            user: new UserResponseDTO(user), 
            accessToken, 
            refreshToken 
        }
        
        return userLogged;
      
    }

}