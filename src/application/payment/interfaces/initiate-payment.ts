import { InitiatePaymentDTO } from "../../../presentation/payment/dtos/input/initiate.js";
import { InitiatePaymentResponseDTO } from "../../../presentation/payment/dtos/output/initiate-response.js";

export interface InitiatePaymentUseCase {
    execute(paymentId: string,initiatePaymentDTO: InitiatePaymentDTO): Promise<InitiatePaymentResponseDTO>;
}
