import type { CalculateShippingCostUseCase } from "../interfaces/calculate-cost-use-case.js";
import type { ShippingMethodRepository } from "../../../domain/shippingMethod/repository.js";
import type { ProductRepository } from "../../../domain/product/repository.js";
import { ShippingCostCalculator } from "../../../domain/shipping/cost-calculator.js";
import { ShippingCostVO } from "../../../domain/shipping/cost-value-object.js";
import { CalculateShippingCostDTO } from "../../../presentation/shipping/dtos/input/calculate-cost.js";


export class CalculateShippingCost implements CalculateShippingCostUseCase {

    constructor(
        private readonly shippingMethodRepository: ShippingMethodRepository,
        private readonly productRepository: ProductRepository,
        private readonly calculators: Map<string, ShippingCostCalculator>
    ) {}

    public async execute(calculateShippingCostDTO: CalculateShippingCostDTO): Promise<number> {

        const shippingMethod = await this.shippingMethodRepository.getMethodById(calculateShippingCostDTO.shippingMethodId);

        const calculator = this.calculators.get(shippingMethod.code);
        if (!calculator) throw new Error(`No hay calculador para el método de envío "${shippingMethod.code}"`);

        const itemsWithWeight = await Promise.all(
            calculateShippingCostDTO.items.map(async item => {
                const product = await this.productRepository.getById(item.productId);
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    weight: product.weight
                };
            })
        );

        const shippingCostVO = new ShippingCostVO(
            itemsWithWeight,
            calculateShippingCostDTO.destination,
            calculateShippingCostDTO.shippingMethodId
        );

        return calculator.calculate(shippingCostVO);
    }


}
