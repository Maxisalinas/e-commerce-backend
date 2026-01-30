import type { GetPaymentStatusUseCase } from "../interfaces/get-payment-status-use-case.js";
import type { PaymentRepository } from "../../../domain/payment/repository.js";
import { PaymentStatusResponseDTO } from "../../../presentation/payment/dtos/output/status-response.js";

export class GetPaymentStatus implements GetPaymentStatusUseCase {

    constructor(
        private readonly paymentRepository: PaymentRepository,
    ) {}

    public async execute(paymentId: string): Promise<PaymentStatusResponseDTO> {

        const payment = await this.paymentRepository.getById(paymentId);

        return PaymentStatusResponseDTO.fromEntity(payment);
    }


}