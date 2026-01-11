import { UpdateCategoryDTO } from "../../../presentation/category/dtos/input/update.js";
import { CategoryResponseDTO } from "../../../presentation/category/dtos/output/response.js";

export interface UpdateCategoryUseCase {
    execute(id: number, updateCategoryDTO: UpdateCategoryDTO): Promise<CategoryResponseDTO>,
}
