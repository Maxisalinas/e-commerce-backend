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
        public readonly weight: number,
    ) {}


    static fromEntity(product: ProductEntity): ProductResponseDTO {
        return new ProductResponseDTO(
            product.id!,
            product.categoryId,
            product.name,
            product.description,
            product.price,
            product.stock,
            product.imageUrl,
            product.weight
        );
    }

    static fromEntityList(products: ProductEntity[]): ProductResponseDTO[] {
        return products.map(product => ProductResponseDTO.fromEntity(product)); 
    }
}
