import { PaymentEntity, PaymentStatus } from "../../../../domain/payment/entity.js";

export class PaymentStatusResponseDTO {
    constructor(
        public status: PaymentStatus,
        public method: string,
        public last4: string,
        public providerPaymentId: string | null,
        public paidAt: Date | null,
        public failureReason?: string
    ) {}

    public static fromEntity(payment: PaymentEntity): PaymentStatusResponseDTO {
        return new PaymentStatusResponseDTO(
            payment.status,
            payment.method,
            payment.last4,
            payment.providerPaymentId ?? null,
            payment.paidAt ?? null,
            payment.failureReason
        );
    }
}
