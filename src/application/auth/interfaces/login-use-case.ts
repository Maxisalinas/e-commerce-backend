import type { LoginResponseDTO } from "../../../presentation/auth/dtos/output/loginResponse.js";
import { LoginUserDTO } from "../../../presentation/user/dtos/input/login.js";

export interface LoginUserUseCase {
    execute( loginUserDTO: LoginUserDTO ): Promise<LoginResponseDTO>;
}