import { GetManyCategoriesDTOProps } from "./getmany-schema.js";

export class GetManyCategoriesDTO {

    public readonly search!: string;

    constructor(input: GetManyCategoriesDTOProps) {
        Object.assign(this, input);
    }

}

