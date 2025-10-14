import { Decimal } from "@prisma/client/runtime/library";
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
        this.description = product.name
        this.price = parseFloat(product.price.toString()); 
        this.stock = product.stock;
        this.imageUrl = product.imageUrl;
    }

}

// RECORDATORIO, podriamos checkear el role para omitir enviar ciertos datos.