import { PaymentStatusResponseDTO } from "../../../presentation/payment/dtos/output/status-response.js";

export interface GetPaymentStatusUseCase {
    execute(paymentId: string): Promise<PaymentStatusResponseDTO>;
}
