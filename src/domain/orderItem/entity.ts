import { Decimal } from "@prisma/client/runtime/library";
import { CartItemEntity } from "../cartItem/entity.js";

export class OrderItemEntity {
    
    public readonly subtotal: Decimal;

    constructor(
        public readonly id: string | null,
        public readonly orderId: string | null,
        public readonly productId: number,
        public readonly name: string,
        public readonly price: Decimal,
        public readonly quantity: number,
    ) {
        this.subtotal = new Decimal(price).mul(quantity);
    }

    public static fromObject(object: any): OrderItemEntity {
        return new OrderItemEntity(
            object.id,
            object.orderId,
            object.productId,
            object.name,
            new Decimal(object.price),
            object.quantity
        );
    }

    public static fromObjectList(objects: any[]): OrderItemEntity[] {
        return objects.map(obj => OrderItemEntity.fromObject(obj));
    }

    public static fromCartItem(cartItem: CartItemEntity): OrderItemEntity {
        
        return new OrderItemEntity(
            null, 
            null, 
            cartItem.productId,
            cartItem.product.name,
            new Decimal(cartItem.product.price),
            cartItem.quantity
        );

    }

    public static fromCartItemList(cartItems: CartItemEntity[]): OrderItemEntity[] {
        return cartItems.map(item => OrderItemEntity.fromCartItem(item));
    }

}

