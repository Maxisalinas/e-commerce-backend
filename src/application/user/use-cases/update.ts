import type { UserRepository } from "../../../domain/user/repository.js";
import type { UpdateUserUseCase } from "../interfaces/update-use-case.js";
import { UserEntity } from "../../../domain/user/entity.js";
import { UpdateUserDTO } from "../../../presentation/user/dtos/input/update.js";
import { UserResponseDTO } from "../../../presentation/user/dtos/output/response.js";

export class UpdateUser implements UpdateUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ){}

    public async execute(id: string, updateUserDTO: UpdateUserDTO): Promise<UserResponseDTO> {

        const user = await this.userRepository.getById(id);

        const userEntity = new UserEntity(
            user.id,
            updateUserDTO.name ?? user.name,
            user.email,
            updateUserDTO.password ?? user.password, // TODO: Implementar use-case especifio: ChangeRoleUseCase
            updateUserDTO.role ?? user.role, // TODO: Implementar use-case especifio: ChangeRoleUseCase
            user.cart
        );
        
        const updatedUser = await this.userRepository.update(userEntity);
        
        return UserResponseDTO.fromEntity(updatedUser); 
    }

}