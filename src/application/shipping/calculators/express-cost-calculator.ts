import { ShippingCostCalculator } from "../../../domain/shipping/cost-calculator.js";
import { ShippingCostVO } from "../../../domain/shipping/cost-value-object.js";


export class ExpressShippingCostCalculator implements ShippingCostCalculator {

    async calculate(input: ShippingCostVO): Promise<number> {

        const totalWeight = input.items.reduce((sum, item) => {
            return sum + item.weight * item.quantity;
        }, 0);

        const baseRate = 5;          // USD por kg
        const expressSurcharge = 10; // recargo fijo

        return totalWeight * baseRate + expressSurcharge;
    }

}
