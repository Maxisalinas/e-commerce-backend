import { GetManyProductsDTO } from "../../../presentation/product/dtos/input/getmany.js";
import { ProductResponseDTO } from "../../../presentation/product/dtos/output/response.js";

export interface GetManyProductsUseCase {
    execute(getManyProductsDTO: GetManyProductsDTO): Promise<ProductResponseDTO[]>;
}
