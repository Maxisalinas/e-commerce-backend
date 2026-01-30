export interface RefundPaymentUseCase {
    execute(paymentId: string): Promise<void>;
}
