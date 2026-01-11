import type { UpdateProductUseCase } from "../interfaces/update-use-case.js";
import type { ProductRepository } from "../../../domain/product/repository.js";
import { ProductEntity } from "../../../domain/product/entity.js";
import { UpdateProductDTO } from "../../../presentation/product/dtos/input/update.js";
import { ProductResponseDTO } from "../../../presentation/product/dtos/output/response.js";


export class UpdateProduct implements UpdateProductUseCase {

    constructor(
        private readonly productRepository: ProductRepository,
    ) {}

    public async execute(id: number, updateProductDTO: UpdateProductDTO): Promise<ProductResponseDTO> {

        const product = await this.productRepository.getById(id);
        const productEntity = new ProductEntity(
            product.id,
            updateProductDTO.categoryId ?? product.categoryId,
            updateProductDTO.name ?? product.name,
            updateProductDTO.description ?? product.description,
            updateProductDTO.price ?? product.price,
            updateProductDTO.stock ?? product.stock,
            updateProductDTO.imageUrl ?? product.imageUrl,
            updateProductDTO.weight ?? product.weight
        );
        const updatedProduct = await this.productRepository.update(productEntity);
        
        return ProductResponseDTO.fromEntity(updatedProduct);     
    }

}