import { AddShippingMethodDTOProps } from "./add-method-schema.js";

export class AddShippingMethodDTO {

    public readonly name!: string;
    public readonly code!: string;
    public readonly price!: number;
    public readonly estimatedDays!: number;
    public readonly isActive!: boolean;         

    constructor(input: AddShippingMethodDTOProps) {
        Object.assign(this, input);
    }
}
