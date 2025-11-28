
import { CartItemDTOProps } from "./item-schema.js";

export class CartItemDTO {

    cartId?: string;     
    productId!: number; 
    quantity!: number;

    constructor(input: CartItemDTOProps) {
        Object.assign(this, input);
    }
}
