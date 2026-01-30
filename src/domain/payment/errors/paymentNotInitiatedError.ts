export class PaymentNotInitiatedError extends Error {

      constructor(
        public message: string,
        public details?: any
    ) {
        super(message);
        this.name = 'PaymentNotInitiatedError';
    }

}