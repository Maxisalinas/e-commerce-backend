import { UserRepository } from "../../../domain/user/repository.js";
import { GetManyUsersDTO } from "../../../presentation/user/dtos/input/getmany.js";
import { UserResponseDTO } from "../../../presentation/user/dtos/output/response.js";
import type { GetManyUsersUseCase } from "../interfaces/getmany-use-case.js";
import type { UserFilter } from "../interfaces/user-filter.js";


export class GetManyUsers implements GetManyUsersUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    public async execute(getManyUsersDTO: GetManyUsersDTO): Promise<UserResponseDTO[]> {
        const userFilter: UserFilter = {
            page: getManyUsersDTO.page,
            limit: getManyUsersDTO.limit,
            search: getManyUsersDTO.search,
            role: getManyUsersDTO.role,
        };

        const users = await this.userRepository.getMany(userFilter);
        return UserResponseDTO.fromEntityList(users);
    }

}
