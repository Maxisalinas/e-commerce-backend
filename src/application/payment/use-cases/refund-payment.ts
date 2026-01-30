import { PaymentStatus } from "@prisma/client";
import { InvalidRefundError } from "../../../domain/payment/errors/invalidRefundError.js";
import { PaymentGateway } from "../../../domain/payment/ports/gateway/gateway.js";
import { PaymentRepository } from "../../../domain/payment/repository.js";
import { RefundPaymentUseCase } from "../interfaces/refund-payment-use-case.js";
import { PaymentProviderError } from "../errors/paymentProviderError.js";


export class RefundPayment implements RefundPaymentUseCase {

    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly paymentGateway: PaymentGateway,
    ) {}

    public async execute(paymentId: string): Promise<void> {

        const payment = await this.paymentRepository.getById(paymentId);

        if (payment.status !== PaymentStatus.PAID) throw new InvalidRefundError('Solo se pueden reembolsar pagos con estado PAID.');
        
        const idempotencyKey = `${payment.id}_refund`;

        try {
            await this.paymentGateway.refundPayment(payment, idempotencyKey);
            payment.markAsRefunded();
            await this.paymentRepository.update(payment);
            
        } catch (error: any) {
            throw new PaymentProviderError(error.message);
        }

    }

}
