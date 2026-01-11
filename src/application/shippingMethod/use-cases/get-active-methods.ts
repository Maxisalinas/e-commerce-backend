import type { ShippingMethodRepository } from "../../../domain/shippingMethod/repository.js";
import type { GetActiveShippingMethodsUseCase } from "../interfaces/get-active-methods-use-case.js";
import { ShippingMethodResponseDTO } from "../../../presentation/shippingMethod/dtos/output/method-response.js";


export class GetActiveShippingMethods implements GetActiveShippingMethodsUseCase {

    constructor(
        private readonly shippingMethodRepository: ShippingMethodRepository,
    ) {}

    public async execute(): Promise<ShippingMethodResponseDTO[]> {

        const shippingMethods = await this.shippingMethodRepository.getActiveMethods();
        
        return ShippingMethodResponseDTO.fromEntityList(shippingMethods);
    }

}