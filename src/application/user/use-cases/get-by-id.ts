import { UserRepository } from "../../../domain/user/repository.js";
import { UserResponseDTO } from "../../../presentation/user/dtos/output/response.js";
import type { GetUserByIdUseCase } from "../interfaces/get-by-id-use-case.js";

export class GetUserById implements GetUserByIdUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    public async execute( id: string ): Promise<UserResponseDTO> {
        const user = await this.userRepository.getById(id);
        return new UserResponseDTO(user);
    }

}