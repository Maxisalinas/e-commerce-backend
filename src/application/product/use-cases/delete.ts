import { ProductRepository } from "../../../domain/product/repository.js";

export interface DeleteProductUseCase {
    execute( id: number ): Promise<void>,
}

export class DeleteProduct implements DeleteProductUseCase {

    constructor(
        private readonly productRepository: ProductRepository,
    ) {}

    public async execute( id: number ): Promise<void> {
        await this.productRepository.delete( id );
        return;
    }

}

