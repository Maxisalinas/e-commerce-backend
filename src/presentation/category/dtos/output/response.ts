import { CategoryEntity } from "../../../../domain/category/entity.js";

export class CategoryResponseDTO {

    public readonly id!: number;
    public readonly name!: string;

    constructor(category: CategoryEntity) {
        Object.assign(this, category)
    }

}

