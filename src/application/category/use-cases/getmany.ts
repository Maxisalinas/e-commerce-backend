import type { GetManyCategoriesUseCase } from "../interfaces/getmany-use-case.js";
import type { CategoryRepository } from "../../../domain/category/repository.js";
import { GetManyCategoriesDTO } from "../../../presentation/category/dtos/input/getmany.js";
import { CategoryResponseDTO } from "../../../presentation/category/dtos/output/response.js";


export interface CategoryFilter {
    // TODO: Esta funcionalidad se implementará a futuro
}

export class GetManyCategories implements GetManyCategoriesUseCase {

    constructor(
        private readonly categoryRepository: CategoryRepository,
    ) {}

    public async execute(getManyCategoriesDTO: GetManyCategoriesDTO): Promise<CategoryResponseDTO[]> {

        const categoryFilter: CategoryFilter = {
            // TODO: Esta funcionalidad se implementará a futuro
        };
        const categories = await this.categoryRepository.getMany(categoryFilter);
        
        return CategoryResponseDTO.fromEntityList(categories); 
    }

}

