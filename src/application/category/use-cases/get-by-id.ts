import { CategoryEntity } from "../../../domain/category/entity.js";
import { CategoryRepository } from "../../../domain/category/repository.js";
import { CategoryResponseDTO } from "../../../presentation/category/dtos/output/response.js";

export interface GetCategoryByIdUseCase {
    execute( id: number ): Promise<CategoryResponseDTO>,
}

export class GetCategoryById implements GetCategoryByIdUseCase {

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    public async execute( id: number ): Promise<CategoryResponseDTO> {
        const category: CategoryEntity = await this.categoryRepository.getById( id );
        const categoryResponseDTO: CategoryResponseDTO = new CategoryResponseDTO(category);
        return categoryResponseDTO;
    }

}