
import { CartRepository } from "../../../domain/cart/repository.js";
import { ProductRepository } from "../../../domain/product/repository.js";
import { CartItemEntity } from "../../../domain/cartItem/entity.js";
import { AddCartItemDTO } from "../../../presentation/cart/dtos/input/add-item.js";
import type { AddCartItemUseCase } from "../interfaces/add-item-use-case.js";
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";
import { NotAvailableStockError } from "../../product/errors/notAvailableStockError.js";

export class AddCartItem implements AddCartItemUseCase{

    constructor(
        private readonly cartRepository: CartRepository,
        private readonly productRepository: ProductRepository,
    ) {}

    public async execute( userId: string, addCartItemDTO: AddCartItemDTO ): Promise<CartResponseDTO> {

        const cart = await this.cartRepository.getByUserId(userId);
        const item = CartItemEntity.fromObject({ cartId: cart.id, ...addCartItemDTO });
        const product = await this.productRepository.getById(item.productId);
        if(product.stock === 0 || addCartItemDTO.quantity > product.stock) throw new NotAvailableStockError('El producto que desea añadir a su carrito no posee stock.');
        const updatedCart = await this.cartRepository.addItem(item);
        return new CartResponseDTO(updatedCart);
        
    }
}
