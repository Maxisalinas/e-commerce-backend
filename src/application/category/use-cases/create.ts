import { CategoryEntity } from "../../../domain/category/entity.js";
import { CategoryRepository } from "../../../domain/category/repository.js";
import { CreateCategoryDTO } from "../../../presentation/category/dtos/input/create.js";
import { CategoryResponseDTO } from "../../../presentation/category/dtos/output/response.js";
import type { CreateCategoryUseCase } from "../interfaces/create-use-case.js";

export class CreateCategory implements CreateCategoryUseCase {

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    public async execute( createCategoryDTO: CreateCategoryDTO ): Promise<CategoryResponseDTO> {

        const category = CategoryEntity.fromObject(createCategoryDTO);
        const newCategory = await this.categoryRepository.create(category);
        return new CategoryResponseDTO(newCategory);
        
    }

}