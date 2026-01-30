import { PaymentMethod } from "../../../../domain/payment/entity.js";
import { CreatePaymentDTOProps } from "./create-schema.js";

export class CreatePaymentDTO {

    public readonly orderId!: string;
    public readonly method!: PaymentMethod;
    public readonly last4!: string;

    constructor(input: CreatePaymentDTOProps) {
        Object.assign(this, input);
    }

    
}
