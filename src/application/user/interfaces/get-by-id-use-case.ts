import { UserResponseDTO } from "../../../presentation/user/dtos/output/response.js";

export interface GetUserByIdUseCase {
    execute( id: string ): Promise<UserResponseDTO>,
}
