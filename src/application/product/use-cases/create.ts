import { ProductEntity } from "../../../domain/product/entity.js";
import { ProductRepository } from "../../../domain/product/repository.js";
import { CreateProductDTO } from "../../../presentation/product/dtos/input/create.js";
import { ProductResponseDTO } from "../../../presentation/product/dtos/output/response.js";

export interface CreateProductUseCase {
    execute( createProductDTO: CreateProductDTO ): Promise<ProductResponseDTO>,
}

export class CreateProduct implements CreateProductUseCase {

    constructor(
        private readonly productRepository: ProductRepository,
    ) {};

    public async execute(createProductDTO: CreateProductDTO): Promise<ProductResponseDTO> {

        const product: ProductEntity = ProductEntity.fromObject(createProductDTO);
        const newProduct = await this.productRepository.create(product);
        const productResponseDTO: ProductResponseDTO = new ProductResponseDTO(newProduct);
        return productResponseDTO;
    };

}