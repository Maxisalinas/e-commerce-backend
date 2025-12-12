import { CartItemEntity } from "../cartItem/entity.js";

export class CartEntity {
    
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly items: CartItemEntity[],
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}

    public static fromObject(object: any): CartEntity {    
        return new CartEntity( 
            object.id, 
            object.userId, 
            CartItemEntity.fromObjectList(object.items), 
            object.createdAt, 
            object.updatedAt 
        );
    }

    public static fromObjectList(objects: any[]): CartEntity[] {
        return objects.map(obj => CartEntity.fromObject(obj));
    }

    public getTotal(): number {
        return this.items.reduce((totalPrice: number, item: CartItemEntity) => {
                const price = item.product.price.toNumber(); 
                return totalPrice + (price * item.quantity);
        }, 0); 
    }

}


