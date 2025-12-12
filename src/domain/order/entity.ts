
import { Decimal } from "@prisma/client/runtime/library";
import { OrderItemEntity } from "../orderItem/entity.js";
import { ShippingAddress, BillingAddress } from "./address.types.js";
import { InvalidOrderStatusError } from "./errors/invalidOrderStatusError .js";
import { OrderAlreadyCancelledError } from "./errors/orderAlreadyCancelledError.js";

export class OrderEntity {

    public readonly totalAmount: Decimal;

    private constructor(
        public readonly id: string | null,
        public readonly userId: string,
        public readonly shippingCost: Decimal,
        public readonly discount: Decimal,
        public status: string,
        public paymentStatus: string,
        public readonly items: OrderItemEntity[],
        public readonly shippingAddress: ShippingAddress,
        public readonly billingAddress: BillingAddress,
        public readonly notes?: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {

        // Calculamos total a partir del subtotal de cada item.
        const itemsTotal = items.reduce(
            (acc, item) => acc.add(item.subtotal),
            new Decimal(0)
        );

        // Asignamos el total luego de agregar el costo de envio y restar los descuentos.
        this.totalAmount = itemsTotal
            .add(shippingCost ?? new Decimal(0))
            .sub(discount ?? new Decimal(0));
    }

    public static create(params: {
        userId: string;
        items: OrderItemEntity[];
        shippingAddress: ShippingAddress;
        billingAddress: BillingAddress;
        shippingCost?: Decimal;
        discount?: Decimal;
        notes?: string;
    }): OrderEntity {

        return new OrderEntity(
            null,
            params.userId,
            params.shippingCost ?? new Decimal(0),
            params.discount ?? new Decimal(0),
            "PENDING",
            "UNPAID",
            params.items,
            params.shippingAddress,
            params.billingAddress,
            params.notes,
            undefined,
            undefined
        );
    }

    public static fromObject(object: any): OrderEntity {
        return new OrderEntity(
            object.id,
            object.userId,
            new Decimal(object.shippingCost),
            new Decimal(object.discount),
            object.status,
            object.paymentStatus,
            OrderItemEntity.fromObjectList(object.items),
            object.shippingAddress,
            object.billingAddress,
            object.notes,
            object.createdAt,
            object.updatedAt
        );
    }

    
    public static fromObjectList(objects: any[]): OrderEntity[] {
        return objects.map((obj: any) => OrderEntity.fromObject(obj));
    }


    public changeStatus(newStatus: string) {
        const allowedStatus = ["PENDING", "PAID", "SHIPPED", "CANCELLED"];
        if (!allowedStatus.includes(newStatus)) throw new InvalidOrderStatusError(`Estado de pedido inválido: ${ newStatus }`);
        if (this.status === "CANCELLED") throw new OrderAlreadyCancelledError('No se puede cambiar el estado de un pedido cancelado.');
        this.status = newStatus;
    }

}
