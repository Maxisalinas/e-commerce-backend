import { ProductEntity } from "../../../../domain/product/entity.js";

export class ProductResponseDTO {
        public readonly id: number;
        public readonly categoryId: number;
        public readonly name: string;
        public readonly description: string;
        public readonly price: number;
        public readonly stock: number;
        public readonly imageUrl: string;
        
    constructor(product: ProductEntity) {
        this.id = product.id;
        this.categoryId = product.categoryId;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price.toNumber();
        this.stock = product.stock;
        this.imageUrl = product.imageUrl;
    }

}

