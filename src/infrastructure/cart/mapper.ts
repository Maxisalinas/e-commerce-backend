import { CartEntity } from "../../domain/cart/entity.js";
import { CartItemEntity } from "../../domain/cartItem/entity.js";
import { ProductMapper } from "../product/mapper.js";

export class CartMapper {
    
    static toDomain(dbCart: any): CartEntity {
        return new CartEntity(
            dbCart.id,
            dbCart.userId,
            CartItemMapper.toDomainFromList(dbCart.items),
            dbCart.createdAt,
            dbCart.updatedAt
        );
    }

    static toPersistence(cart: CartEntity) {
        return {
            userId: cart.userId,
            items: CartItemMapper.toPersistenceFromList(cart.items),
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt
        };
    }

}

// ITEMS

export class CartItemMapper {
    
    static toDomain(dbCartItem: any): CartItemEntity {
        return new CartItemEntity(
            dbCartItem.id,
            dbCartItem.cartId,
            dbCartItem.productId,
            dbCartItem.quantity,
            ProductMapper.toDomain(dbCartItem.product),
            dbCartItem.createdAt,
            dbCartItem.updatedAt
        );
    }

    static toPersistence(cartItem: CartItemEntity) {
        return {
            cartId: cartItem.cartId,
            productId: cartItem.productId,
            quantity: cartItem.quantity,
            product: ProductMapper.toPersistence(cartItem.product),
            createdAt: cartItem.createdAt,
            updatedAt: cartItem.updatedAt
        };
    }

    static toDomainFromList(dbCartItems: any[]): CartItemEntity[] {
        return dbCartItems.map(item => this.toDomain(item));
    }
    
    static toPersistenceFromList(cartItems: CartItemEntity[]) {
        return cartItems.map(item => this.toPersistence(item));
    }

}

