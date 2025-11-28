
import { CartRepository } from "../../../domain/cart/repository.js";
import { ProductRepository } from "../../../domain/product/repository.js";
import { CartItemEntity } from "../../../domain/cartItem/entity.js";
import { AddCartItemDTO } from "../../../presentation/cart/dtos/input/add-item.js";
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";
import type { AddCartItemUseCase } from "../interfaces/add-item-use-case.js";

export class AddCartItem implements AddCartItemUseCase{

    constructor(
        private readonly cartRepository: CartRepository,
        private readonly productRepository: ProductRepository,
    ) {}

    public async execute( addCartItemDTO: AddCartItemDTO ): Promise<CartResponseDTO> {
        const item = CartItemEntity.fromObject(addCartItemDTO);
        const product = await this.productRepository.getById(item.productId);
        if(product.stock === 0) throw new Error('El producto que desea añadir no posee stock')
        const updatedCart = await this.cartRepository.addItem(item);
        return new CartResponseDTO(updatedCart);
    }
}
