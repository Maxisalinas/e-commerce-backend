import { CartEntity } from "./entity.js";
import { CartItemEntity } from "../cartItem/entity.js";

export abstract class CartRepository {
    
    abstract getById(id: string): Promise<CartEntity>; 
    abstract getByUserId(userId: string): Promise<CartEntity>; ;
    abstract clear(id: string): Promise<CartEntity>; 
    
    // ITEMS
    abstract getItemById(id: string): Promise<CartItemEntity>; 
    abstract getItemByProductId(cartId: string, productId: number): Promise<CartItemEntity | null>
    abstract addItem(item: CartItemEntity): Promise<CartEntity>;
    abstract updateItem(item: CartItemEntity): Promise<CartEntity>; 
    abstract removeItem(id: string): Promise<CartEntity>; 
    
}