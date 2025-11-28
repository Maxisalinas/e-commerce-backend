import { CartRepository } from "../../../domain/cart/repository.js";
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";
import { ClearCartUseCase } from "../interfaces/clear-use-case.js";


export class ClearCart implements ClearCartUseCase {

    constructor(
        private readonly cartRepository: CartRepository,
    ) {}

    public async execute( id: string ): Promise<CartResponseDTO> {
        await this.cartRepository.getById(id);
        const clearedCart = await this.cartRepository.clear(id);
        return new CartResponseDTO(clearedCart);
    }
}
