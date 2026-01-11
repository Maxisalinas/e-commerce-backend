import { CategoryEntity } from "../../domain/category/entity.js";

export class CategoryMapper {
    
    static toDomain(dbCategory: any): CategoryEntity {
        return new CategoryEntity(
            dbCategory.id,
            dbCategory.name,
        );
    }
    static toPersistence(category: CategoryEntity) {
        return {
            name: category.name,
        };
    }

    static toDomainFromList(dbCategories: any[]): CategoryEntity[] {
        return dbCategories.map(category => this.toDomain(category));
    }

    static toPersistenceFromList(categories: CategoryEntity[]) {
        return categories.map(category => this.toPersistence(category));
    }

}

