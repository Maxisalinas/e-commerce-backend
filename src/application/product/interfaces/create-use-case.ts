import { CreateProductDTO } from "../../../presentation/product/dtos/input/create.js";
import { ProductResponseDTO } from "../../../presentation/product/dtos/output/response.js";

export interface CreateProductUseCase {
    execute( createProductDTO: CreateProductDTO ): Promise<ProductResponseDTO>,
}
