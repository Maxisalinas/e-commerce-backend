import { ProductEntity } from "../../../domain/product/entity.js";
import { ProductRepository } from "../../../domain/product/repository.js";
import { CreateProductDTO } from "../../../presentation/product/dtos/input/create.js";
import { ProductResponseDTO } from "../../../presentation/product/dtos/output/response.js";
import type { CreateProductUseCase } from "../interfaces/create-use-case.js";

export class CreateProduct implements CreateProductUseCase {

    constructor(
        private readonly productRepository: ProductRepository,
    ) {}

    public async execute(createProductDTO: CreateProductDTO): Promise<ProductResponseDTO> {
        const product = ProductEntity.fromObject(createProductDTO);
        const newProduct = await this.productRepository.create(product);
        return new ProductResponseDTO(newProduct);
    }

}