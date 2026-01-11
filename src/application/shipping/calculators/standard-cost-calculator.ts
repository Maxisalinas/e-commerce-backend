import { ShippingCostCalculator } from "../../../domain/shipping/cost-calculator.js";
import { ShippingCostVO } from "../../../domain/shipping/cost-value-object.js";


export class StandardShippingCalculator implements ShippingCostCalculator {

    async calculate(input: ShippingCostVO): Promise<number> {

        const totalWeight = input.items.reduce((sum, item) => {
            return sum + item.weight * item.quantity;
        }, 0);

        const baseRate = 3; // USD por kg
        const flatFee = 0;  // sin recargo adicional

        return totalWeight * baseRate + flatFee;
    }

}
