import { CategoryRepository } from "../../../domain/category/repository.js";
import { DeleteCategoryUseCase } from "../interfaces/delete-use-case.js";

export class DeleteCategory implements DeleteCategoryUseCase {

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    public async execute( id: number ): Promise<void> {
        await this.categoryRepository.delete( id );
        return;
    }

}

