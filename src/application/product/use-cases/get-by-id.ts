import type { GetProductByIdUseCase } from "../interfaces/get-by-id-use-case.js";
import type { ProductRepository } from "../../../domain/product/repository.js";
import { ProductResponseDTO } from "../../../presentation/product/dtos/output/response.js";

export class GetProductById implements GetProductByIdUseCase {

    constructor(
        private readonly productRepository: ProductRepository,
    ) {}

    public async execute( id: number ): Promise<ProductResponseDTO> {
   
        const product = await this.productRepository.getById( id );

        return ProductResponseDTO.fromEntity(product);
    }

}