import { ProductEntity } from "../../../domain/product/entity.js";
import { ProductRepository } from "../../../domain/product/repository.js";
import { ProductResponseDTO } from "../../../presentation/product/dtos/output/response.js";

export interface GetProductByIdUseCase {
    execute( id: number ): Promise<ProductResponseDTO>,
}

export class GetProductById implements GetProductByIdUseCase {

    constructor(
        private readonly productRepository: ProductRepository,
    ) {}

    public async execute( id: number ): Promise<ProductResponseDTO> {
   
        const product: ProductEntity = await this.productRepository.getById( id );
        const productsResponseDTO: ProductResponseDTO = new ProductResponseDTO(product);
        return productsResponseDTO;
    }

}