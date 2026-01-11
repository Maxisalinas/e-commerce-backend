
import { OrderItemEntity } from "../orderItem/entity.js";
import { ShippingAddress, BillingAddress } from "./address.types.js";
import { InvalidOrderStatusError } from "./errors/invalidOrderStatusError .js";
import { OrderAlreadyCancelledError } from "./errors/orderAlreadyCancelledError.js";

export class OrderEntity {

    public readonly totalAmount: number;

    constructor(
        // Identidad
        public readonly id: string | null,

        // Relaciones
        public readonly userId: string,
        public readonly shippingMethodId: string,

        // Estados
        public status: string,
        public paymentStatus: string,

        // Items
        public readonly items: OrderItemEntity[],

        // Montos
        public readonly discount: number,
        public readonly shippingCost: number,

        // Direcciones
        public readonly shippingAddress: ShippingAddress,
        public readonly billingAddress: BillingAddress,

        // Otros
        public readonly notes?: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {

        // Calculamos total a partir del subtotal de cada item
        const itemsTotal = items.reduce(
            (acc, item) => acc + item.subtotal,
            0
        );

        // Asignamos el total luego de agregar el costo de envío y restar los descuentos
        this.totalAmount =
            itemsTotal +
            (shippingCost || 0) -
            (discount || 0);
    }

    public static create(params: {
        id: string | null;
        userId: string;
        shippingMethodId: string;
        status: string;
        paymentStatus: string;
        items: OrderItemEntity[];
        discount: number;
        shippingCost: number;
        shippingAddress: ShippingAddress;
        billingAddress: BillingAddress;
        notes?: string;
    }): OrderEntity {
        return new OrderEntity(
            null,
            params.userId,
            params.shippingMethodId,
            params.status = 'PENDING',
            params.paymentStatus = 'PENDING',
            params.items,
            params.discount,
            params.shippingCost,
            params.shippingAddress,
            params.billingAddress,
            params.notes,
        );
    }

    public changeStatus(newStatus: string) {
        const allowedStatus = ["PENDING", "PAID", "SHIPPED", "CANCELLED"];
        if (!allowedStatus.includes(newStatus)) throw new InvalidOrderStatusError(`Estado de pedido inválido: ${newStatus}`);
        if (this.status === "CANCELLED") throw new OrderAlreadyCancelledError('No se puede cambiar el estado de un pedido cancelado.');
        this.status = newStatus;
    }

}
