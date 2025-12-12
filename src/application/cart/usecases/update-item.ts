import { CartEntity } from "../../../domain/cart/entity.js";
import { CartRepository } from "../../../domain/cart/repository.js";
import { CartItemEntity } from "../../../domain/cartItem/entity.js";
import { UpdateCartItemDTO } from "../../../presentation/cart/dtos/input/update-item.js";
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";
import { UpdateCartItemUseCase } from "../interfaces/update-item-use-case.js";


export class UpdateCartItem implements UpdateCartItemUseCase {

    constructor(
        private readonly cartRepository: CartRepository,
    ) {}

    public async execute( id: string, updateCartItemDTO: UpdateCartItemDTO ): Promise<CartResponseDTO> {

        await this.cartRepository.getItemById(id);
        const itemEntity = CartItemEntity.fromObject({ id, ...updateCartItemDTO });
        const updatedCart = await this.cartRepository.updateItem(itemEntity);
        return new CartResponseDTO(updatedCart);

    }
    
}
