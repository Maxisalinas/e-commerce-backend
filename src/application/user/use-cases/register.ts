import { UserEntity } from "../../../domain/user/entity.js";
import { UserRepository } from "../../../domain/user/repository.js";
import { RegisterUserDTO } from "../../../presentation/user/dtos/input/register.js";
import { UserResponseDTO } from "../../../presentation/user/dtos/output/response.js";
import type { PasswordHasher } from "../interfaces/password-hasher.js";
import type { RegisterUserUseCase } from "../interfaces/register-use-case.js";
import { DatabaseValidationError } from "../../../infrastructure/errors/databaseValidationError.js";


export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
    ) {}

    public async execute(registerUserDTO: RegisterUserDTO): Promise<UserResponseDTO> {
        registerUserDTO.password = await this.passwordHasher.hash(registerUserDTO.password);
        const user = UserEntity.create(registerUserDTO);
        const exist = await this.userRepository.getByEmail(user.email);
        if (exist !== null) throw new DatabaseValidationError('Ya existe un usuario con el correo electrónico proporcionado.'); 
        const newUser = await this.userRepository.register(user);
        return UserResponseDTO.fromEntity(newUser);
    }

}
