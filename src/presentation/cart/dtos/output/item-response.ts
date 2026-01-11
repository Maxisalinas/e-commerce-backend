import { CartItemEntity } from "../../../../domain/cartItem/entity.js";
import { ProductResponseDTO } from "../../../product/dtos/output/response.js";

export class CartItemResponseDTO {
    
    constructor(
        public readonly id: string,
        public readonly productId: number,
        public readonly quantity: number,
        public readonly product: ProductResponseDTO,
        public readonly createdAt: Date,
        public readonly updatedAt: Date
    ){}

    
    static fromEntity(item: CartItemEntity): CartItemResponseDTO {
        return new CartItemResponseDTO(
            item.id!,
            item.productId,
            item.quantity,
            ProductResponseDTO.fromEntity(item.product),
            item.createdAt!,
            item.updatedAt!
        );
    }

    static fromEntityList(items: CartItemEntity[]): CartItemResponseDTO[] {
        return items.map(item => CartItemResponseDTO.fromEntity(item)); 
    }

}
