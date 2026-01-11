export class OrderItemEntity {
    
    public readonly subtotal: number;

    constructor(
        public readonly id: string | null,
        public readonly orderId: string | null,
        public readonly productId: number,
        public readonly name: string,
        public readonly price: number,
        public readonly quantity: number,
    ) {
        this.subtotal = price * quantity;
    }

    public static create(params: {
        id: string | null;
        orderId: string | null;
        productId: number;
        name: string;
        price: number;
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