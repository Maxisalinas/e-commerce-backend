import { ProductEntity } from "../../../../domain/product/entity.js";

export class ProductResponseDTO {
    
    constructor(
        public readonly id: number,
        public readonly categoryId: number,
        public readonly name: string,
        public readonly description: string,
        public readonly price: number,
        public readonly stock: number,
        public readonly imageUrl: string,
    ) {}


    static fromEntity(product: ProductEntity): ProductResponseDTO {
        return new ProductResponseDTO(
            product.id,
            product.categoryId,
            product.name,
            product.description,
            product.price.toNumber(),
            product.stock,
            product.imageUrl
        );
    }

    static fromEntityList(products: ProductEntity[]): ProductResponseDTO[] {
        return products.map(product => ProductResponseDTO.fromEntity(product)); 
    }
}
