import { GetManyCategoriesDTO } from "../../../presentation/category/dtos/input/getmany.js";
import { CategoryResponseDTO } from "../../../presentation/category/dtos/output/response.js";

export interface GetManyCategoriesUseCase {
    execute(getManyCategoriesDTO: GetManyCategoriesDTO): Promise<CategoryResponseDTO[]>,
}
