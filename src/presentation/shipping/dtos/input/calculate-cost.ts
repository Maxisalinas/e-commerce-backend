import { CalculateShippingCostDTOProps } from "../../../shipping/dtos/input/calculate-cost-schema.js";

export class CalculateShippingCostDTO {

    public readonly items!: Array<{
        productId: number;
        quantity: number;
    }>;

    public readonly destination!: {
        country: string;
        state: string;
        city: string;
        postalCode: string;
    };
    
    public readonly shippingMethodId!: string;
   

    constructor(input: CalculateShippingCostDTOProps) {
        Object.assign(this, input);
    }
}
