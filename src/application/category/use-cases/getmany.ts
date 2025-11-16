import { CategoryEntity } from "../../../domain/category/entity.js";
import { CategoryRepository } from "../../../domain/category/repository.js";
import { GetManyCategoriesDTO } from "../../../presentation/category/dtos/input/getmany.js";
import { CategoryResponseDTO } from "../../../presentation/category/dtos/output/response.js";
import type { GetManyCategoriesUseCase } from "../interfaces/getmany-use-case.js";


export interface CategoryFilter {
    // TODO
}

export class GetManyCategories implements GetManyCategoriesUseCase {

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    public async execute(getManyCategoriesDTO: GetManyCategoriesDTO): Promise<CategoryResponseDTO[]> {

        const categoryFilter: CategoryFilter = {
            // TODO
            // property: getManyCategoriesDTO.property
        };
        const categories: CategoryEntity[] = await this.categoryRepository.getMany( categoryFilter );
        return categories.map( category => new CategoryResponseDTO(category) ); 
    }

}

