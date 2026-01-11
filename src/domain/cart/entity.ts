import { CartItemEntity } from "../cartItem/entity.js";

export class CartEntity {
    
    constructor(
        public readonly id: string | null,
        public readonly userId: string,
        public readonly items: CartItemEntity[],
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}

    public static create(params: {
        id: string | null;
        userId: string;
        items: CartItemEntity[];
        createdAt?: Date;
        updatedAt?: Date;
    }): CartEntity {
        return new CartEntity(
            null,
            params.userId,
            params.items,
        );
    }

    public getTotal(): number {
        return this.items.reduce((totalPrice: number, item: CartItemEntity) => {
                return totalPrice + (item.product.price * item.quantity);
        }, 0); 
    }

}


