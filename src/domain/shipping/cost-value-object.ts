export class ShippingCostVO {

    constructor(
        public readonly items: { 
            productId: number; 
            quantity: number; 
            weight: number; 
        }[],

        public readonly destination: { 
            country: string; 
            state: string; 
            city: string; 
            postalCode: string; 
        },

        public readonly shippingMethodId: string

    ) {}

    
}
