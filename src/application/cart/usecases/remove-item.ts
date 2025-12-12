import { CartRepository } from "../../../domain/cart/repository.js";
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";
import type { RemoveCartItemUseCase } from "../interfaces/remove-item-use-case.js";


export class RemoveCartItem implements RemoveCartItemUseCase {

    constructor(
        private readonly cartRepository: CartRepository,
    ) {}

    public async execute( id: string ): Promise<CartResponseDTO> {

        await this.cartRepository.getItemById(id);
        const updatedCart = await this.cartRepository.removeItem(id);
        return new CartResponseDTO(updatedCart);

    }
    
}
