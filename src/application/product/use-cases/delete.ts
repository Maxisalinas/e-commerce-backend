import { ProductRepository } from "../../../domain/product/repository.js";
import type { DeleteProductUseCase } from "../interfaces/delete-use-case.js";

export class DeleteProduct implements DeleteProductUseCase {

    constructor(
        private readonly productRepository: ProductRepository,
    ) {}

    public async execute( id: number ): Promise<void> {

        await this.productRepository.getById(id);
        await this.productRepository.delete(id);
        
        return;
        
    }

}

