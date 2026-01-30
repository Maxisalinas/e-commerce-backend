import type { ConfirmPaymentUseCase } from "../interfaces/confirm-payment-use-case.js";
import type { PaymentRepository } from "../../../domain/payment/repository.js";
import type { OrderRepository } from "../../../domain/order/repository.js";
import type { PaymentGateway } from "../../../domain/payment/ports/gateway/gateway.js";
import { PaymentStatus } from "../../../domain/payment/entity.js";
import { PaymentNotInitiatedError } from "../../../domain/payment/errors/paymentNotInitiatedError.js";
import { PaymentProviderError } from "../errors/paymentProviderError.js";


export class ConfirmPayment implements ConfirmPaymentUseCase {

    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly orderRepository: OrderRepository,
        private readonly paymentGateway: PaymentGateway,
    ) {}

    public async execute(paymentId: string): Promise<PaymentStatus> {

        const payment = await this.paymentRepository.getById(paymentId);
        if (payment.isFinal()) return payment.status;
        if (!payment.providerPaymentId) throw new PaymentNotInitiatedError(payment.id!);

        try {
            const result = await this.paymentGateway.confirmPayment(payment.providerPaymentId);

            switch (result.status) {
                case PaymentStatus.PAID:
                    payment.markAsPaid(new Date());
                    const order = await this.orderRepository.getById(payment.orderId);
                    order.markAsPaid();
                    await this.orderRepository.update(order);
                    break;

                case PaymentStatus.FAILED:
                    payment.markAsFailed(result.failureReason);
                    break;

                case PaymentStatus.EXPIRED:
                    payment.markAsExpired();
                    break;

                case PaymentStatus.PROCESSING:
                    return payment.status;
            }

            await this.paymentRepository.update(payment);

            return payment.status;

        } catch (error: any) {
            throw new PaymentProviderError(error.message);
        }
    }

    public async executeFromProvider(providerPaymentId: string): Promise<PaymentStatus> {

        const payment = await this.paymentRepository.getByProviderPaymentId(providerPaymentId);

        return this.execute(payment.id!);
    }

}
