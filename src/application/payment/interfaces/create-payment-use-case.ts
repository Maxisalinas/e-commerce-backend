import { CreatePaymentDTO } from "../../../presentation/payment/dtos/input/create.js";
import { PaymentResponseDTO } from "../../../presentation/payment/dtos/output/create-response.js";

export interface CreatePaymentUseCase { 
    execute(createPaymentDTO: CreatePaymentDTO): Promise<PaymentResponseDTO>;
}
