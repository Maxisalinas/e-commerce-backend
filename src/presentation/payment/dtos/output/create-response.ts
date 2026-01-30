
import { PaymentEntity, PaymentStatus } from "../../../../domain/payment/entity.js";

export class CreatePaymentResponseDTO {

    constructor(
        public readonly id: string,
        public readonly status: PaymentStatus
    ){}

    static fromEntity(payment: PaymentEntity): CreatePaymentResponseDTO {
        return new CreatePaymentResponseDTO(
            payment.id!,
            payment.status
        );
    }
    
    
}
