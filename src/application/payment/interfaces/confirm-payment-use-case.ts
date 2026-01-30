import { PaymentStatus } from "../../../domain/payment/entity.js";

export interface ConfirmPaymentUseCase { 
    execute(paymentId: string): Promise<PaymentStatus>;
    executeFromProvider(providerPaymentId: string): Promise<PaymentStatus>;
}
