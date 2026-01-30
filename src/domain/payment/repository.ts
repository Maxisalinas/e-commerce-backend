import { PaymentEntity } from "./entity.js";

export abstract class PaymentRepository {

    abstract getById(id: string): Promise<PaymentEntity>;
    abstract getByOrderId(orderId: string): Promise<PaymentEntity | null>;
    abstract getByProviderPaymentId(providerPaymentId: string): Promise<PaymentEntity>;
    abstract create(payment: PaymentEntity): Promise<PaymentEntity>;
    abstract update(payment: PaymentEntity): Promise<PaymentEntity>;

}

