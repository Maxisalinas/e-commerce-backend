import type { UpdateProductDTOProps } from "./update-schema.js";

export class UpdateProductDTO {

    public readonly categoryId?: number;
    public readonly name?: string;
    public readonly description?: string;
    public readonly price?: number;
    public readonly stock?: number;
    public readonly imageUrl?: string;
    public readonly weight?: number;

    constructor(input: UpdateProductDTOProps) {
        Object.assign(this, input);
    }

}

