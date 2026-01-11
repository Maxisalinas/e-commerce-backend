import { prisma } from "../database/postgres/prisma-client.js";
import type { CartRepository } from "../../domain/cart/repository.js";
import { CartItemMapper, CartMapper } from "./mapper.js";
import { CartEntity } from "../../domain/cart/entity.js";
import { CartItemEntity } from "../../domain/cartItem/entity.js";
import { NotFoundError } from "../../application/errors/notFoundError.js";

export class CartRepositoryImpl implements CartRepository {

    public async getById(id: string): Promise<CartEntity> {

        const cart = await prisma.cart.findUnique({
            where: { id },
            include: {
                items: {
                    include: { product: true } 
                }
            },
        });
        if (!cart) throw new NotFoundError('No se encontró un carrito con el ID proporcionado.');

        return CartMapper.toDomain(cart);
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

        return CartMapper.toDomain(cart);
    }

    public async clear(id: string): Promise<CartEntity> {

        await prisma.cartItem.deleteMany({
            where: { id }
        });

        return await this.getById(id);
    }
    

    // ITEMS
    public async addItem(item: CartItemEntity): Promise<CartEntity> {

        const { product, ...data } = CartItemMapper.toPersistence(item)

        await prisma.cartItem.create({ data });
        
        return await this.getById(item.cartId);
    }

    public async getItemById(id: string): Promise<CartItemEntity> {

        const item = await prisma.cartItem.findUnique({
            where: { id },
            include: { product: true } 
        });
        if (!item) throw new NotFoundError('No se encontró un item de carrito con el ID proporcionado.');

        return CartItemMapper.toDomain(item);
    }
    
    public async getItemByProductId(cartId: string, productId: number): Promise<CartItemEntity | null> {

        const item = await prisma.cartItem.findFirst({
            where: { cartId, productId },
        });

        return item ? CartItemMapper.toDomain(item) : null;
    }


    public async updateItem(item: CartItemEntity): Promise<CartEntity> {

        const { product, ...data } = CartItemMapper.toPersistence(item);

        const updatedItem = await prisma.cartItem.update({
            where: { id: item.id! },
            data,
        });
        
        return await this.getById(updatedItem.cartId);   
    }
    
    public async removeItem(id: string): Promise<CartEntity> {

        const deletedItem = await prisma.cartItem.delete({
            where: { id },
        });
        
        return await this.getById(deletedItem.cartId);
    }

    
}
