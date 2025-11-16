import { UpdateCategoryDTOProps } from "./update-schema.js";

export class UpdateCategoryDTO {

    public readonly name!: string;

    constructor(input: UpdateCategoryDTOProps) {
        Object.assign(this, input);
    }

}

