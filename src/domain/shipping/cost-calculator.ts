import { ShippingCostVO } from "./cost-value-object.js";

export interface ShippingCostCalculator {
    calculate(input: ShippingCostVO): Promise<number>;
}