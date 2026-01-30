import { CartItemEntity } from "../cartItem/entity.js";
import { Money } from "../shared/value-objects/money.js";
import { CartEmptyError } from "../shared/errors/cartEmptyError.js";

export class CartEntity {

    constructor(
        public readonly id: string | null,
        public readonly userId: string,
        public readonly items: CartItemEntity[],
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) { }

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

    public getTotal(): Money {

        if (this.items.length === 0) throw new CartEmptyError('No se pudo calcular el total de un carrito sin items.');
        
        const currency = this.items[0].product.price.currency;

        return this.items.reduce(
            (total: Money, item: CartItemEntity) => {
                return total.add(item.getSubtotal());
            },
            Money.of(0, currency)
        );
    }


}


