import type { CreateProductUseCase } from "../interfaces/create-use-case.js";
import type { ProductRepository } from "../../../domain/product/repository.js";
import { ProductEntity } from "../../../domain/product/entity.js";
import { CreateProductDTO } from "../../../presentation/product/dtos/input/create.js";
import { ProductResponseDTO } from "../../../presentation/product/dtos/output/response.js";

export class CreateProduct implements CreateProductUseCase {

    constructor(
        private readonly productRepository: ProductRepository,
    ) {}

    public async execute(createProductDTO: CreateProductDTO): Promise<ProductResponseDTO> {

        const product = ProductEntity.create({
            id: null,
            categoryId: createProductDTO.categoryId,
            name: createProductDTO.name,
            description: createProductDTO.description,
            price: createProductDTO.price,
            stock: createProductDTO.stock,
            imageUrl: createProductDTO.imageUrl,
            weight: createProductDTO.weight,
        });
        const newProduct = await this.productRepository.create(product);
        
        return ProductResponseDTO.fromEntity(newProduct);
        
    }

}