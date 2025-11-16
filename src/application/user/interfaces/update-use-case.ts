
import { UpdateUserDTO } from "../../../presentation/user/dtos/input/update.js";
import { UserResponseDTO } from "../../../presentation/user/dtos/output/response.js";

export interface UpdateUserUseCase {
    execute(id: string, updateUserDTO: UpdateUserDTO): Promise<UserResponseDTO>,
}
