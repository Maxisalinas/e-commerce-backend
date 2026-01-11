import { CreateCategoryDTO } from "../../../presentation/category/dtos/input/create.js";
import { CategoryResponseDTO } from "../../../presentation/category/dtos/output/response.js";

export interface CreateCategoryUseCase {
    execute(createCategoryDTO: CreateCategoryDTO): Promise<CategoryResponseDTO>;
}
