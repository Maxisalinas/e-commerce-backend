import type { ShippingMethodRepository } from "../../../domain/shippingMethod/repository.js";
import type { GetShippingMethodByIdUseCase } from "../interfaces/get-method-by-id-use-case.js";
import { ShippingMethodResponseDTO } from "../../../presentation/shippingMethod/dtos/output/method-response.js";

export class GetShippingMethodById implements GetShippingMethodByIdUseCase {

    constructor(
        private readonly shippingMethodRepository: ShippingMethodRepository,
    ) {}

    public async execute(id: string): Promise<ShippingMethodResponseDTO> {
        
        const shippingMethod = await this.shippingMethodRepository.getMethodById(id);
        
        return ShippingMethodResponseDTO.fromEntity(shippingMethod);
    }

}