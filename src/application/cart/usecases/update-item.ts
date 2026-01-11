import type { UpdateCartItemUseCase } from "../interfaces/update-item-use-case.js";
import type { CartRepository } from "../../../domain/cart/repository.js";
import { CartItemEntity } from "../../../domain/cartItem/entity.js";
import { UpdateCartItemDTO } from "../../../presentation/cart/dtos/input/update-item.js";
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";


export class UpdateCartItem implements UpdateCartItemUseCase {

    constructor(
        private readonly cartRepository: CartRepository,
    ) {}

    public async execute(id: string, updateCartItemDTO: UpdateCartItemDTO): Promise<CartResponseDTO> {

        const item = await this.cartRepository.getItemById(id);
        const updatedItem = new CartItemEntity(
            item.id,
            item.cartId, // Si no se pasa, se mantiene el valor anterior
            item.productId,
            updateCartItemDTO.quantity,
            item.product,
        );
        
        const updatedCart = await this.cartRepository.updateItem(updatedItem);

        return CartResponseDTO.fromEntity(updatedCart);
    }
    
}
