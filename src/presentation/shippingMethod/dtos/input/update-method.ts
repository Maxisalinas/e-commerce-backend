import { UpdateShippingMethodDTOProps } from "./update-method-schema.js";

export class UpdateShippingMethodDTO {

    public readonly name?: string;
    public readonly code?: string;
    public readonly price?: number;
    public readonly estimatedDays?: number;
    public readonly isActive?: boolean;         

    constructor(input: UpdateShippingMethodDTOProps) {
        Object.assign(this, input);
    }
    
}
