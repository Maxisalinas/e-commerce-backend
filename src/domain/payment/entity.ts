import { Money } from "../shared/value-objects/money.js";
import { InvalidPaymentStateError } from "./errors/invalidPaymentStateError.js";

export enum PaymentStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    PAID = 'PAID',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED',
    EXPIRED = 'EXPIRED',
}

export enum PaymentMethod {
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
}

export enum PaymentProvider {
    MERCADOPAGO = "MERCADOPAGO",
}

export class PaymentEntity {
    constructor(
        public readonly id: string | null,
        public readonly orderId: string,
        public providerPaymentId: string | null,
        public status: PaymentStatus,
        public readonly amount: Money,
        public method: PaymentMethod,
        public last4: string,
        public readonly provider: PaymentProvider,
        public idempotencyKey: string | null,
        public paidAt: Date | null,
        public failureReason?: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) { }

    public static create(params: {
        orderId: string;
        amount: Money;
        method: PaymentMethod;
        last4: string;
    }): PaymentEntity {
        return new PaymentEntity(
            null,
            params.orderId,
            null,
            PaymentStatus.PENDING,
            params.amount,
            params.method,
            params.last4,
            PaymentProvider.MERCADOPAGO,
            null,
            null,
        );
    }

    public markAsProcessing() {
        if (this.status !== PaymentStatus.PENDING) throw new InvalidPaymentStateError(`No se puede procesar un pago que no está PENDING (actual: ${this.status})`);  
        this.status = PaymentStatus.PROCESSING;
    }

    public markAsPaid(date: Date) {
        if (![PaymentStatus.PENDING, PaymentStatus.PROCESSING].includes(this.status)) throw new InvalidPaymentStateError(`Solo se puede marcar como PAID desde PENDING o PROCESSING (actual: ${this.status})`);
        this.status = PaymentStatus.PAID;
        this.paidAt = date;
    }

    public markAsFailed(reason?: string) {
        if (![PaymentStatus.PENDING, PaymentStatus.PROCESSING].includes(this.status)) throw new InvalidPaymentStateError(`Solo se puede fallar desde PENDING o PROCESSING (actual: ${this.status})`);
        this.status = PaymentStatus.FAILED;
        this.failureReason = reason ?? undefined;
    }

    public markAsRefunded() {
        if (this.status !== PaymentStatus.PAID) throw new InvalidPaymentStateError(`Solo se puede reembolsar un pago PAID (actual: ${this.status})`);
        this.status = PaymentStatus.REFUNDED;
    }

    public markAsExpired() {
        if (![PaymentStatus.PENDING, PaymentStatus.PROCESSING].includes(this.status)) throw new InvalidPaymentStateError(`Solo se puede expirar un pago PENDING o PROCESSING (actual: ${this.status})`);
        this.status = PaymentStatus.EXPIRED;
    }

    public attachProviderData(data: {
        providerPaymentId: string;
        // Otros datos del proveedor a actualizar si es necesario
    }) {
        this.providerPaymentId = data.providerPaymentId;
    }

    public isFinal(): boolean {
        return [
            PaymentStatus.PAID,
            PaymentStatus.FAILED,
            PaymentStatus.REFUNDED,
            PaymentStatus.EXPIRED,
        ].includes(this.status);
    }


}
