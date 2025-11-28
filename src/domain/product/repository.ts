import { ProductEntity } from "./entity.js";
import { ProductFilter } from "../../application/product/interfaces/filter.js";

export abstract class ProductRepository {
    
    abstract getById( id: number ): Promise<ProductEntity>;
    abstract getMany( filters: ProductFilter ): Promise<ProductEntity[]>;
    abstract create( product: ProductEntity ): Promise<ProductEntity>;
    abstract update( product: ProductEntity ): Promise<ProductEntity>;
    abstract delete( id: number ): Promise<void>;
    
}