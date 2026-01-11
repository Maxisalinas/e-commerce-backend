import type { AddShippingMethodUseCase } from "../interfaces/add-method-use-case.js";
import type { ShippingMethodRepository } from "../../../domain/shippingMethod/repository.js";
import { ShippingMethodEntity } from "../../../domain/shippingMethod/entity.js";
import { AddShippingMethodDTO } from "../../../presentation/shippingMethod/dtos/input/add-method.js";
import { ShippingMethodResponseDTO } from "../../../presentation/shippingMethod/dtos/output/method-response.js";

export class AddShippingMethod implements AddShippingMethodUseCase {

    constructor(
        private readonly shippingMethodRepository: ShippingMethodRepository,
    ) {}


    public async execute(addShippingMethodDTO: AddShippingMethodDTO): Promise<ShippingMethodResponseDTO> {

        const shippigMethod = ShippingMethodEntity.create({ 
            id: null, 
            name: addShippingMethodDTO.name,
            code: addShippingMethodDTO.code,
            price: addShippingMethodDTO.price,
            estimatedDays: addShippingMethodDTO.estimatedDays,
            isActive: addShippingMethodDTO.isActive  
        })
        const newShippingMethod = await this.shippingMethodRepository.addMethod(shippigMethod);
        
        return ShippingMethodResponseDTO.fromEntity(newShippingMethod);
    }

}

