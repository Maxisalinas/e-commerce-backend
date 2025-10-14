import { CategoryEntity } from "../../../domain/category/entity.js";
import { CategoryRepository } from "../../../domain/category/repository.js";
import { UpdateCategoryDTO } from "../../../presentation/category/dtos/input/update.js";
import { CategoryResponseDTO } from "../../../presentation/category/dtos/output/response.js";

export interface UpdateCategoryUseCase {
    execute( id: number, updateCategoryDTO: UpdateCategoryDTO ): Promise<CategoryResponseDTO>,
}

export class UpdateCategory implements UpdateCategoryUseCase {

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {};

    public async execute(id: number, updateCategoryDTO: UpdateCategoryDTO): Promise<CategoryResponseDTO> {

        const category = await this.categoryRepository.getById( id );
        const categoryEntity: CategoryEntity = CategoryEntity.fromObject(category);
        const updatedCategory = await this.categoryRepository.update(id, categoryEntity, updateCategoryDTO );
        const categoryResponseDTO: CategoryResponseDTO = new CategoryResponseDTO(updatedCategory);
        return categoryResponseDTO;
    };

}