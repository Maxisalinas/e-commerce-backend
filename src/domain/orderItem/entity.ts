import { Money } from "../shared/value-objects/money.js";

export class OrderItemEntity {

    public readonly subtotal: Money;

    constructor(
        public readonly id: string | null,
        public readonly orderId: string | null,
        public readonly productId: number,
        public readonly name: string,
        public readonly price: Money,
        public readonly quantity: number,
    ) {
        this.subtotal = price.multiply(quantity);
    }

    public static create(params: {
        productId: number;
        name: string;
        price: Money;
        quantity: number;
    }): OrderItemEntity {
        return new OrderItemEntity(
            null,
            null,
            params.productId,
            params.name,
            params.price,
            params.quantity
        );
    }
}
