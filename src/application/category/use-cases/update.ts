import type { UpdateCategoryUseCase } from "../interfaces/update-use-case.js";
import type { CategoryRepository } from "../../../domain/category/repository.js";
import { CategoryEntity } from "../../../domain/category/entity.js";
import { UpdateCategoryDTO } from "../../../presentation/category/dtos/input/update.js";
import { CategoryResponseDTO } from "../../../presentation/category/dtos/output/response.js";


export class UpdateCategory implements UpdateCategoryUseCase {

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    public async execute(id: number, updateCategoryDTO: UpdateCategoryDTO): Promise<CategoryResponseDTO> {

        const category = await this.categoryRepository.getById( id );
        const categoryEntity = new CategoryEntity(
            category.id,
            updateCategoryDTO.name, 
        );
        const updatedCategory = await this.categoryRepository.update(categoryEntity);
        
        return CategoryResponseDTO.fromEntity(updatedCategory); 
    }

}