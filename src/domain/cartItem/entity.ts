import { ProductEntity } from "../product/entity.js";
import { Money } from "../shared/value-objects/money.js";

export class CartItemEntity {

    constructor(
        public readonly id: string | null,
        public readonly cartId: string,
        public readonly productId: number,
        public readonly quantity: number,
        public readonly product: ProductEntity,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}

    static create(props: {
        cartId: string,
        productId: number,
        quantity: number,
        product: ProductEntity,
        createdAt?: Date,
        updatedAt?: Date,
    }): CartItemEntity {
        return new CartItemEntity(
            null,
            props.cartId,
            props.productId,
            props.quantity,
            props.product,
            props.createdAt,
            props.updatedAt,
        );
    }

    public getSubtotal(): Money {
        return this.product.price.multiply(this.quantity);
    }
}
