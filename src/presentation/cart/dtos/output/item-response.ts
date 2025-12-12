import { CartItemEntity } from "../../../../domain/cartItem/entity.js";
import { ProductResponseDTO } from "../../../product/dtos/output/response.js";

export class CartItemResponseDTO {
    public readonly id: string;
    public readonly productId: number;
    public readonly quantity: number;
    public readonly product: ProductResponseDTO;  
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    
    constructor(item: CartItemEntity) {
        this.id = item.id;
        this.productId = item.productId;
        this.quantity = item.quantity;
        this.product = ProductResponseDTO.fromEntity(item.product!); 
        this.createdAt = item.createdAt!;
        this.updatedAt = item.updatedAt!;
    }

    static fromEntity(item: CartItemEntity): CartItemResponseDTO {
        return new CartItemResponseDTO(item);
    }

    static fromEntityList(items: CartItemEntity[]): CartItemResponseDTO[] {
        return items.map(item => new CartItemResponseDTO(item)); 
    }
}
