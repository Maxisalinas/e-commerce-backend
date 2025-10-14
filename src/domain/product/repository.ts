import { ProductEntity } from "./entity.js";
import { ProductFilter } from "../../application/product/use-cases/getmany.js";
import { UpdateProductDTO } from "../../presentation/product/dtos/input/update.js";


export abstract class ProductRepository {
    
    abstract getById( id: number ): Promise<ProductEntity>;
    
    abstract getMany( filters: ProductFilter ): Promise<ProductEntity[]>;
    
    abstract create( product: ProductEntity ): Promise<ProductEntity>;

    abstract update( id: number, product: ProductEntity, dto: UpdateProductDTO ): Promise<ProductEntity>;

    abstract delete( id: number ): Promise<void>;
}