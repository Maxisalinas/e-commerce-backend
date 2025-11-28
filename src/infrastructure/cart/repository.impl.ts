import { prisma } from "../database/postgres/prisma-client.js";
import { CartRepository } from "../../domain/cart/repository.js";
import { CartEntity } from "../../domain/cart/entity.js";
import { CartItemEntity } from "../../domain/cartItem/entity.js";
import { NotFoundError } from "../errors/notFoundError.js";

export class CartRepositoryImpl implements CartRepository {

    public async getById(id: string): Promise<CartEntity> {
        const cart = await prisma.cart.findUnique({
            where: { id },
            include: {
                items: {
                    include: { product: true } // Incluir datos del producto
                }
            },
        });
        if (!cart) throw new NotFoundError('No se encontró un carrito con el ID proporcionado.');
        return CartEntity.fromObject(cart);
    }

    public async getByUserId(userId: string): Promise<CartEntity> {
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: { product: true }
                }
            },
        });
        if (!cart) throw new NotFoundError('No se encontró un carrito con el ID proporcionado.');
        return CartEntity.fromObject(cart);
    }

    public async clear(cartId: string): Promise<CartEntity> {
        await prisma.cartItem.deleteMany({
            where: { cartId }
        });
        const updatedCart = await this.getById(cartId);
        return updatedCart;
    }
    
    // ITEMS
    public async addItem(item: CartItemEntity): Promise<CartEntity> {
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: item.cartId,
                productId: item.productId,
            },
        });

        if (existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + item.quantity },
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: item.cartId,
                    productId: item.productId,
                    quantity: item.quantity,
                },
            });
        }

        const updatedCart = await this.getById(item.cartId);
        return updatedCart;
    }

    public async getItemById(id: string): Promise<CartItemEntity> {
        const item = await prisma.cartItem.findUnique({
            where: { id },
            include: { product: true } // Incluir datos del producto
        });
        if (!item) throw new NotFoundError('No se encontró un item de carrito con el ID proporcionado.');
        return CartItemEntity.fromObject(item);
    }
    
    public async updateItem(item: CartItemEntity): Promise<CartEntity> {
        const updatedItem = await prisma.cartItem.update({
            where: { id: item.id },
            data: { quantity: item.quantity },
        });
        const updatedCart = await this.getById(updatedItem.cartId);
        return updatedCart;
    }
    
    public async removeItem(id: string): Promise<CartEntity> {
        const deletedItem = await prisma.cartItem.delete({
            where: { id },
        });
        const updatedCart = await this.getById(deletedItem.cartId);
        return updatedCart;
    }
    
}
