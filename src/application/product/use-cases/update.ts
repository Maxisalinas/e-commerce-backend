import { ProductEntity } from "../../../domain/product/entity.js";
import { ProductRepository } from "../../../domain/product/repository.js";
import { UpdateProductDTO } from "../../../presentation/product/dtos/input/update.js";
import { ProductResponseDTO } from "../../../presentation/product/dtos/output/response.js";
import { UpdateProductUseCase } from "../interfaces/update-use-case.js";


export class UpdateProduct implements UpdateProductUseCase {

    constructor(
        private readonly productRepository: ProductRepository,
    ) {}

    public async execute(id: number, updateProductDTO: UpdateProductDTO): Promise<ProductResponseDTO> {
        const product = await this.productRepository.getById( id );
        const productEntity = ProductEntity.fromObject({
            ...product,
            ...updateProductDTO
        });
        const updatedProduct = await this.productRepository.update(productEntity);
        return new ProductResponseDTO(updatedProduct);
    }

}