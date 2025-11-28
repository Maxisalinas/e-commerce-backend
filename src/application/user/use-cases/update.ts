import { UserEntity } from "../../../domain/user/entity.js";
import { UserRepository } from "../../../domain/user/repository.js";
import type { UpdateUserUseCase } from "../interfaces/update-use-case.js";
import { UpdateUserDTO } from "../../../presentation/user/dtos/input/update.js";
import { UserResponseDTO } from "../../../presentation/user/dtos/output/response.js";

export class UpdateUser implements UpdateUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ){}

    public async execute(id: string, updateUserDTO: UpdateUserDTO): Promise<UserResponseDTO> {
        const user = await this.userRepository.getById(id);
        const userEntity = UserEntity.fromObject({
            ...user,
            ...updateUserDTO,
        });
        const updatedUser = await this.userRepository.update(userEntity);
        return new UserResponseDTO(updatedUser); 
    }

}