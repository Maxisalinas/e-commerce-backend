import { CategoryResponseDTO } from "../../../presentation/category/dtos/output/response.js";

export interface GetCategoryByIdUseCase {
    execute(id: number): Promise<CategoryResponseDTO>,
}
