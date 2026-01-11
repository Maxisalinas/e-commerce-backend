import { ShippingCostVO } from "../../../domain/shipping/cost-value-object.js";
import { CalculateShippingCostDTO } from "../../../presentation/shipping/dtos/input/calculate-cost.js";

export interface CalculateShippingCostUseCase {
    execute(input: CalculateShippingCostDTO | ShippingCostVO ): Promise<number>;
}
