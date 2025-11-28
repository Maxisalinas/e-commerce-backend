import { UpdateProductDTO } from "../../../presentation/product/dtos/input/update.js";
import { ProductResponseDTO } from "../../../presentation/product/dtos/output/response.js";

export interface UpdateProductUseCase {
    execute( id: number, updateProductDTO: UpdateProductDTO ): Promise<ProductResponseDTO>,
}