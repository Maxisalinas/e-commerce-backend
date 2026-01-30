import type { InitiatePaymentUseCase } from "../interfaces/initiate-payment.js";
import type { PaymentRepository } from "../../../domain/payment/repository.js";
import type { PaymentGateway } from "../../../domain/payment/ports/gateway/gateway.js";
import { PaymentStatus } from "../../../domain/payment/entity.js";
import { InitiatePaymentResponseDTO } from "../../../presentation/payment/dtos/output/initiate-response.js";
import { InitiatePaymentDTO } from "../../../presentation/payment/dtos/input/initiate.js";
import { InvalidPaymentStateError } from "../../../domain/payment/errors/invalidPaymentStateError.js";
import { PaymentProviderError } from "../errors/paymentProviderError.js";


export class InitiatePayment implements InitiatePaymentUseCase {

    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly paymentGateway: PaymentGateway,
    ) { }


    async execute(paymentId: string, initiatePaymentDTO: InitiatePaymentDTO): Promise<InitiatePaymentResponseDTO> {

        const payment = await this.paymentRepository.getById(paymentId);

        if (![PaymentStatus.PENDING].includes(payment.status)) throw new InvalidPaymentStateError(`No se puede iniciar el pago desde estado ${payment.status}`);

        payment.markAsProcessing();

        if (!payment.idempotencyKey) {
            payment.idempotencyKey = crypto.randomUUID();
        }

        await this.paymentRepository.update(payment);

        try {
            const result = await this.paymentGateway.initiatePayment({
                paymentId: payment.id!,
                amount: payment.amount,
                cardToken: initiatePaymentDTO.cardToken,
                idempotencyKey: payment.idempotencyKey,
                payerEmail: initiatePaymentDTO.payerEmail,
            });

            payment.attachProviderData({
                providerPaymentId: result.providerPaymentId,
            });

            await this.paymentRepository.update(payment);

            return new InitiatePaymentResponseDTO(
                payment.id!,
                result.clientSecret,
                result.redirectUrl,
            );

        } catch (error: any) {
            payment.markAsFailed(error.message);
            await this.paymentRepository.update(payment);
            throw new PaymentProviderError(error.message);
        }
    }

}