import { CategoryRepository } from "../../../domain/category/repository.js";

export interface DeleteCategoryUseCase {
    execute( id: number ): Promise<void>,
}

export class DeleteCategory implements DeleteCategoryUseCase {

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    public async execute( id: number ): Promise<void> {
        await this.categoryRepository.delete( id );
        return;
    }

}

