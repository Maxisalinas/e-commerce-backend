import { GetManyUsersDTO } from "../../../presentation/user/dtos/input/getmany.js";
import { UserResponseDTO } from "../../../presentation/user/dtos/output/response.js";

export interface GetManyUsersUseCase {
    execute( getManyUsersDTO: GetManyUsersDTO ): Promise<UserResponseDTO[]>,
}
