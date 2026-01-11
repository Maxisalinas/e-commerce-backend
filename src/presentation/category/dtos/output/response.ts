import { CategoryEntity } from "../../../../domain/category/entity.js";

export class CategoryResponseDTO {

    constructor(
        public readonly id: number,
        public readonly name: string
    ){}

    static fromEntity(category: CategoryEntity): CategoryResponseDTO {
        return new CategoryResponseDTO(
            category.id!,
            category.name,
        );
    }

    static fromEntityList(categories: CategoryEntity[]): CategoryResponseDTO[] {
        return categories.map(category => CategoryResponseDTO.fromEntity(category)); 
    }

}
