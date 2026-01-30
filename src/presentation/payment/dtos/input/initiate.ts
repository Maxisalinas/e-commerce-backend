import { InitiatePaymentDTOProps } from "./initiate-schema.js";

export class InitiatePaymentDTO {

    public readonly cardToken?: string;
    public readonly payerEmail!: string;

    constructor(input: InitiatePaymentDTOProps) {
        Object.assign(this, input);
    }

    
}


