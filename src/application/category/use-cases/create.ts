import type { CreateCategoryUseCase } from "../interfaces/create-use-case.js";
import type { CategoryRepository } from "../../../domain/category/repository.js";
import { CategoryEntity } from "../../../domain/category/entity.js";
import { CreateCategoryDTO } from "../../../presentation/category/dtos/input/create.js";
import { CategoryResponseDTO } from "../../../presentation/category/dtos/output/response.js";

export class CreateCategory implements CreateCategoryUseCase {

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    public async execute(createCategoryDTO: CreateCategoryDTO): Promise<CategoryResponseDTO> {

        const category = CategoryEntity.create({
            id:null,
            name: createCategoryDTO.name
        });
        const newCategory = await this.categoryRepository.create(category);
       
        return CategoryResponseDTO.fromEntity(newCategory); 
    }

}