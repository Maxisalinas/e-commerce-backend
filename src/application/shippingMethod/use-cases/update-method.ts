import type { UpdateShippingMethodUseCase } from "../interfaces/update-method-use-case.js";
import type { ShippingMethodRepository } from "../../../domain/shippingMethod/repository.js";
import { ShippingMethodEntity } from "../../../domain/shippingMethod/entity.js";
import { UpdateShippingMethodDTO } from "../../../presentation/shippingMethod/dtos/input/update-method.js";
import { ShippingMethodResponseDTO } from "../../../presentation/shippingMethod/dtos/output/method-response.js";

export class UpdateShippingMethod implements UpdateShippingMethodUseCase {

    constructor(
        private readonly shippingMethodRepository: ShippingMethodRepository,
    ) {}


    public async execute(id: string, updateShippingMethodDTO: UpdateShippingMethodDTO): Promise<ShippingMethodResponseDTO> {

        const shippingMethod = await this.shippingMethodRepository.getMethodById(id);
        const updatedEntity = new ShippingMethodEntity(
            shippingMethod.id, 
            updateShippingMethodDTO.name ?? shippingMethod.name,
            updateShippingMethodDTO.code ?? shippingMethod.code,
            updateShippingMethodDTO.price ?? shippingMethod.price,
            updateShippingMethodDTO.estimatedDays ?? shippingMethod.estimatedDays,
            updateShippingMethodDTO.isActive ?? shippingMethod.isActive
        );
        const updatedShippingMethod = await this.shippingMethodRepository.updateMethod(updatedEntity);
        
        return ShippingMethodResponseDTO.fromEntity(updatedShippingMethod);
    }

}