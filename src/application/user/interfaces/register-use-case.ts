
import { RegisterUserDTO } from "../../../presentation/user/dtos/input/register.js";
import { UserResponseDTO } from "../../../presentation/user/dtos/output/response.js";

export interface RegisterUserUseCase {
    execute( registerUserDTO: RegisterUserDTO ): Promise<UserResponseDTO>;
}