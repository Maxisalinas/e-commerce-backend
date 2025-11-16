import { CreateCategoryDTOProps } from "./create-schema.js";

export class CreateCategoryDTO {

    public readonly name!: string;

    constructor(input: CreateCategoryDTOProps) {
        Object.assign(this, input);
    }

}

