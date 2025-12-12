import { TemporaryCartItemDTOProps } from "./temporary-item-schema.js";


export class TemporaryCartItemDTO {
         
    cartId?: string;
    productId!: number; 
    quantity!: number;

    constructor(input: TemporaryCartItemDTOProps) {
        Object.assign(this, input);
    }
}
