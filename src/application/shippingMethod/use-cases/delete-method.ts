import type { DeleteShippingMethodUseCase } from "../interfaces/delete-method-use-case.js";
import type { ShippingMethodRepository } from "../../../domain/shippingMethod/repository.js";

export class DeleteShippingMethod implements DeleteShippingMethodUseCase {

    constructor(
        private readonly shippingMethodRepository: ShippingMethodRepository,
    ) {}

    public async execute(id: string): Promise<void> {

        await this.shippingMethodRepository.getMethodById(id);
        await this.shippingMethodRepository.deleteMethod(id);
        
        return;
    }

}