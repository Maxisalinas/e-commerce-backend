import { Payment } from "@prisma/client";
import { PaymentEntity, PaymentMethod, PaymentProvider } from "../../domain/payment/entity.js";
import { Currency, Money } from "../../domain/shared/value-objects/money.js";
import { PaymentStatus } from "../../domain/payment/entity.js";


export class PaymentMapper {

    static toDomain(dbPayment: Payment): PaymentEntity {
        return new PaymentEntity(
            dbPayment.id,
            dbPayment.orderId,
            dbPayment.providerPaymentId,
            dbPayment.status as PaymentStatus,
            Money.of(Number(dbPayment.amount), dbPayment.currency as Currency),
            dbPayment.method as PaymentMethod,
            dbPayment.last4!,
            dbPayment.provider as PaymentProvider,
            dbPayment.idempotencyKey,
            dbPayment.paidAt,
            dbPayment.failureReason ?? undefined,
            dbPayment.createdAt,
            dbPayment.updatedAt
        );
    }

    static toPersistence(payment: PaymentEntity) {

        return {
            orderId: payment.orderId,
            providerPaymentId: payment.providerPaymentId,
            status: payment.status,
            amount: payment.amount.value,
            currency: payment.amount.currency,
            method: payment.method,
            last4: payment.last4,
            provider: payment.provider,
            idempotencyKey: payment.idempotencyKey,
            paidAt: payment.paidAt,
            failureReason: payment.failureReason,
        };
    }

    static toDomainFromList(dbPayments: any[]): PaymentEntity[] {
        return dbPayments.map(payment => this.toDomain(payment));
    }

    static toPersistenceFromList(payments: PaymentEntity[]) {
        return payments.map(payment => this.toPersistence(payment));
    }
}
