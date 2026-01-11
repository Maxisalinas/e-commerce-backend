import type { DeleteCategoryUseCase } from "../interfaces/delete-use-case.js";
import type { CategoryRepository } from "../../../domain/category/repository.js";

export class DeleteCategory implements DeleteCategoryUseCase {

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    public async execute(id: number): Promise<void> {

        await this.categoryRepository.getById(id);
        await this.categoryRepository.delete(id);
        
        return;
    }

}

