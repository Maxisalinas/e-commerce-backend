import { GetManyProductsDTOProps } from "./getmany-schema.js";

export class GetManyProductsDTO {

    public readonly page!: number;
    public readonly limit!: number;
    public readonly search!: string;
    public readonly categoryId?: number;
    public readonly minPrice?: number;
    public readonly maxPrice?: number;

    constructor(input: GetManyProductsDTOProps) {
        Object.assign(this, input);
    }

}
