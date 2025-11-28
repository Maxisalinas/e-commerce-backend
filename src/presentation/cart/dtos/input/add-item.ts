import { AddCartItemDTOProps } from "./add-item-schema.js";

export class AddCartItemDTO {

    cartId!: string;       
    productId!: number; 
    quantity!: number;

    constructor(input: AddCartItemDTOProps) {
        Object.assign(this, input);
    }
}
