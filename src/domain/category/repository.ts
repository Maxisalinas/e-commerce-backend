import { CategoryFilter } from "../../application/category/use-cases/getmany.js";
import { UpdateCategoryDTO } from "../../presentation/category/dtos/input/update.js";
import { CategoryEntity } from "./entity.js";

export abstract class CategoryRepository {

    abstract getMany( filter: CategoryFilter ): Promise<CategoryEntity[]>;
    
    abstract create( category: CategoryEntity ): Promise<CategoryEntity>;

    abstract getById( id: number ): Promise<CategoryEntity>;

    abstract update( id: number, category: CategoryEntity, dto: UpdateCategoryDTO): Promise<CategoryEntity>;

    abstract delete( id: number ): Promise<void>;
}