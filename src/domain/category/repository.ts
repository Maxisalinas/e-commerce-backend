import { CategoryEntity } from "./entity.js";
import type { CategoryFilter } from "../../application/category/use-cases/getmany.js";

export abstract class CategoryRepository {
    
    abstract getById( id: number ): Promise<CategoryEntity>;
    abstract getMany( filter: CategoryFilter ): Promise<CategoryEntity[]>;
    abstract create( category: CategoryEntity ): Promise<CategoryEntity>;
    abstract update( category: CategoryEntity ): Promise<CategoryEntity>;
    abstract delete( id: number ): Promise<void>;
    
}