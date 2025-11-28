import { UpdateCartItemDTOProps } from "./update-item-schema.js";

export class UpdateCartItemDTO {
   
    quantity!: number;

    constructor(input: UpdateCartItemDTOProps) {
        Object.assign(this, input);
    }
}
