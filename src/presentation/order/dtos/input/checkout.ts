import { CheckoutDTOProps } from './checkout-schema.js';

export class CheckoutDTO {

    public readonly shippingMethodId!: string;

    public readonly shippingAddress!: {
        name: string;
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        phone: string;
    };

    public readonly billingAddress!: {
        name: string;
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };

    public readonly notes?: string;

    constructor(input: CheckoutDTOProps) {
        Object.assign(this, input);
    }

    
}
