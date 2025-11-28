import { CartItemEntity } from "../../../../domain/cartItem/entity.js";
import { ProductResponseDTO } from "../../../product/dtos/output/response.js";


export class CartItemResponseDTO {
    
    public readonly id!: string;
    public readonly productId!: number;
    public readonly product?: ProductResponseDTO;  
    public readonly quantity!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    
    constructor(item: CartItemEntity) {

        const { cartId, product, createdAt, updatedAt, ...itemData } = item;
        
        Object.assign(this, itemData);

        this.product = product ? new ProductResponseDTO(product) : undefined;
    }
}
