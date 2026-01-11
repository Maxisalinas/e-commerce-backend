
import type { AddCartItemUseCase } from "../interfaces/add-item-use-case.js";
import type { CartRepository } from "../../../domain/cart/repository.js";
import type { ProductRepository } from "../../../domain/product/repository.js";
import { CartItemEntity } from "../../../domain/cartItem/entity.js";
import { AddCartItemDTO } from "../../../presentation/cart/dtos/input/add-item.js";
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";
import { NotAvailableStockError } from "../../product/errors/notAvailableStockError.js";

export class AddCartItem implements AddCartItemUseCase{

    constructor(
        private readonly cartRepository: CartRepository,
        private readonly productRepository: ProductRepository,
    ) {}

    public async execute(userId: string, addCartItemDTO: AddCartItemDTO): Promise<CartResponseDTO> {

        const { productId, quantity } = addCartItemDTO;

        const cart = await this.cartRepository.getByUserId(userId);
        const product = await this.productRepository.getById(productId);
        if(product.stock === 0 || quantity > product.stock) throw new NotAvailableStockError('El producto que desea añadir a su carrito no posee stock.');
        
        const existingItem = await this.cartRepository.getItemByProductId(cart.id!, productId);
        let updatedCart;

        if (existingItem) {
            const updatedItem = new CartItemEntity(
                existingItem.id,
                existingItem.cartId,
                existingItem.productId,
                existingItem.quantity + quantity,
                existingItem.product,
            );

            updatedCart = await this.cartRepository.updateItem(updatedItem);
        } else {
            const newItem = CartItemEntity.create({
                id: null,
                cartId: cart.id!,
                productId,
                quantity,
                product,
            });

            updatedCart = await this.cartRepository.addItem(newItem); 
        }

        return CartResponseDTO.fromEntity(updatedCart)
    }


}
