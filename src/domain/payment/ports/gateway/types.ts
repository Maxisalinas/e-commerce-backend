import { Money } from "../../../shared/value-objects/money.js";
import { PaymentStatus } from "../../entity.js";


export interface InitiateRequest {
    paymentId: string;
    amount: Money;
    cardToken?: string;
    installments?: number;
    idempotencyKey: string;
    payerEmail: string;
}

export interface InitiateResponse {
    providerPaymentId: string;
    clientSecret?: string;
    redirectUrl?: string;
}

export interface ConfirmResult {
    status: PaymentStatus;
    failureReason?: string;
}