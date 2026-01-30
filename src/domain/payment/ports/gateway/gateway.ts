import type { InitiateRequest } from "./types/initiate-request.js";
import type { InitiateResponse } from "./types/initiate-response.js";
import type { ConfirmResult } from "./types/confirm-result.js";
import { PaymentEntity } from "../../entity.js";

export interface PaymentGateway {

    initiatePayment(request: InitiateRequest): Promise<InitiateResponse>;
    confirmPayment(paymentIntentId: string): Promise<ConfirmResult>;
    refundPayment(payment: PaymentEntity, idempotencyKey: string): Promise<void>;
    
}