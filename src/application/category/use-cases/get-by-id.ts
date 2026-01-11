import type { GetCategoryByIdUseCase } from "../interfaces/get-by-id-use-case.js";
import type { CategoryRepository } from "../../../domain/category/repository.js";
import { CategoryEntity } from "../../../domain/category/entity.js";
import { CategoryResponseDTO } from "../../../presentation/category/dtos/output/response.js";


export class GetCategoryById implements GetCategoryByIdUseCase {

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    public async execute(id: number): Promise<CategoryResponseDTO> {
  
        const category: CategoryEntity = await this.categoryRepository.getById( id );
        
        return CategoryResponseDTO.fromEntity(category);   
    }

}