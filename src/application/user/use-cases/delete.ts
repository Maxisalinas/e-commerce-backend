import type { DeleteUserUseCase } from "../interfaces/delete-use-case.js";
import type { UserRepository } from "../../../domain/user/repository.js";


export class DeleteUser implements DeleteUserUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    public async execute(id: string): Promise<void> {

        await this.userRepository.getById(id)
        await this.userRepository.delete(id);
        
        return;  
    }

}

