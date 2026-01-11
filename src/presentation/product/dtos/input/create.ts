import { CreateProductDTOProps } from "./create-schema.js";

export class CreateProductDTO {

    public readonly categoryId!: number;
    public readonly name!: string;
    public readonly description!: string;
    public readonly price!: number;
    public readonly stock!: number;
    public readonly imageUrl!: string;
    public readonly weight!: number;

    constructor(input: CreateProductDTOProps) {
        Object.assign(this, input);
    }
}
