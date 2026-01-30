
import { OrderItemEntity } from "../orderItem/entity.js";
import { PaymentStatus } from "../payment/entity.js";
import { Money } from "../shared/value-objects/money.js";
import { InvalidOrderStateError } from "./errors/invalidOrderStateError .js";

export enum OrderStatus {
    PENDING = 'PENDING',
    PAID = 'PAID',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export interface ShippingAddress {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
}

export interface BillingAddress {
    name: string;
    street: string;
    city: string;
    state: string;      
    postalCode: string;
    country: string;
}



export class OrderEntity {

    public readonly totalAmount: Money;

    constructor(
        // Identidad
        public readonly id: string | null,

        // Relaciones
        public readonly userId: string,
        public readonly shippingMethodId: string,

        // Estados
        public status: OrderStatus,
        public paymentStatus: PaymentStatus,

        // Items
        public readonly items: OrderItemEntity[],

        // Montos
        public readonly discount: Money,
        public readonly shippingCost: Money,

        // Direcciones
        public readonly shippingAddress: ShippingAddress,
        public readonly billingAddress: BillingAddress,

        // Otros
        public readonly notes?: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {
        this.totalAmount = this.calculateTotal();
    }

    public static create(params: {
        userId: string;
        shippingMethodId: string;
        items: OrderItemEntity[];
        discount?: Money;
        shippingCost: Money;
        shippingAddress: ShippingAddress;
        billingAddress: BillingAddress;
        notes?: string;
    }): OrderEntity {

        const currency = params.items[0].subtotal.currency;

        return new OrderEntity(
            null,
            params.userId,
            params.shippingMethodId,
            OrderStatus.PENDING,
            PaymentStatus.PENDING,
            params.items,
            params.discount ?? Money.of(0, currency),
            params.shippingCost,
            params.shippingAddress,
            params.billingAddress,
            params.notes
        );
    }


    private calculateTotal(): Money {

        if (this.items.length === 0) {
            throw new Error('Order must have at least one item');
        }

        const itemsTotal = this.items.reduce(
            (acc, item) => acc.add(item.subtotal),
            Money.of(0, this.items[0].subtotal.currency)
        );

        return itemsTotal
            .add(this.shippingCost)
            .subtract(this.discount);
    }
    
    
    public markAsPaid() {
        if (this.status !== OrderStatus.PENDING) throw new InvalidOrderStateError(`No se puede pagar una orden ${this.status}`);
        
        this.status = OrderStatus.PAID;
        this.paymentStatus = PaymentStatus.PAID;
    }
    
    public markAsProcessing() {
        if (this.status !== OrderStatus.PAID) throw new InvalidOrderStateError(`Solo se puede procesar una orden PAID`);

        this.status = OrderStatus.PROCESSING;
    }

    public markAsShipped() {
        if (this.status !== OrderStatus.PROCESSING) throw new InvalidOrderStateError(`Solo se puede enviar una orden PROCESSING`);

        this.status = OrderStatus.SHIPPED;
    }
    
    public markAsDelivered() {
        if (this.status !== OrderStatus.SHIPPED) throw new InvalidOrderStateError(`Solo se puede entregar una orden SHIPPED`);
        
        this.status = OrderStatus.DELIVERED;
    }

    public markAsCancelled(reason?: string) {
        if ([OrderStatus.SHIPPED, OrderStatus.DELIVERED].includes(this.status)) throw new InvalidOrderStateError(`No se puede cancelar una orden ${this.status}`);
        
        this.status = OrderStatus.CANCELLED;
    }
















}


