export class InitiatePaymentResponseDTO {

    constructor(
        public readonly paymentId: string,
        public readonly clientSecret?: string,
        public readonly redirectUrl?: string,
    ){}

}
