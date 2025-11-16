import { CategoryEntity } from "../../../domain/category/entity.js";
import { CategoryRepository } from "../../../domain/category/repository.js";
import { UpdateCategoryDTO } from "../../../presentation/category/dtos/input/update.js";
import { CategoryResponseDTO } from "../../../presentation/category/dtos/output/response.js";
import { UpdateCategoryUseCase } from "../interfaces/update-use-case.js";


export class UpdateCategory implements UpdateCategoryUseCase {

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    public async execute(id: number, updateCategoryDTO: UpdateCategoryDTO): Promise<CategoryResponseDTO> {
        const category = await this.categoryRepository.getById( id );
        const categoryEntity = CategoryEntity.fromObject({
            ...category,
            ...updateCategoryDTO, 
        });
        const updatedCategory = await this.categoryRepository.update(categoryEntity);
        return new CategoryResponseDTO(updatedCategory);
    }

}