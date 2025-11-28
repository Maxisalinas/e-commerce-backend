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
        const {
            id,
            userId,
            items,
            createdAt,
            updatedAt
        } = object;

        const itemEntities =  Array.isArray(items) ? CartItemEntity.fromObjectList(items) : [];

        return new CartEntity(
            id,
            userId,
            itemEntities,
            createdAt,
            updatedAt
        );
    }

    public static fromObjectList(objects: any[]): CartEntity[] {
        return objects.map(obj => CartEntity.fromObject(obj));
    }

    public getTotal(): number {
        return this.items.reduce((totalPrice: number, item: CartItemEntity) => {
            // Acceder directamente a item.product y convertir el precio a number
            if (item.product) {
                const price = item.product.price.toNumber();  // Convertir Decimal a number
                return totalPrice + (price * item.quantity);  // Sumar el total
            }

            // Si el producto no tiene precio o no es válido, no sumamos nada
            return totalPrice;
        }, 0);  // El valor inicial de 'total' es 0
    }

}


