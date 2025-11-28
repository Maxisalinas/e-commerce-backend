import { ProductResponseDTO } from "../../../presentation/product/dtos/output/response.js";

export interface GetProductByIdUseCase {
    execute( id: number ): Promise<ProductResponseDTO>,
}
