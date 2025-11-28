import { prisma } from "../database/postgres/prisma-client.js";
import { UserRepository } from "../../domain/user/repository.js";
import { UserEntity } from "../../domain/user/entity.js";
import type { UserFilter } from "../../application/user/interfaces/user-filter.js";
import { NotFoundError } from "../errors/notFoundError.js";

export class UserRepositoryImpl implements UserRepository {

    public async getById( id: string ): Promise<UserEntity> { 
        const user = await prisma.user.findUnique({
            where: {
                    id
            },
            include: { 
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        });
        if (!user) throw new NotFoundError('No se encontró un usuario con el número de ID proporcionado.');
        return UserEntity.fromObject(user);
    }
          
    async getByEmail(email: string): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            include: { 
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        });
        if (!user) return null;
        return UserEntity.fromObject(user);
    }
        
    public async getMany( filter: UserFilter ): Promise<UserEntity[]> {
        const users = await prisma.user.findMany(); // TODO FILTRAR
        if (!users) throw new NotFoundError(`No se encontraron usuarios.`);
        return UserEntity.fromObjectList(users);
    }
            
    public async register(user: UserEntity): Promise<UserEntity> {
        const newUser = await prisma.user.create({
            data: {
                ...user,
                // Si `user.cart` existe, se crea el carrito junto con los ítems
                cart: user.cart
                    ? {
                        create: {
                            items: {
                                create: user.cart.items.map(item => ({
                                    productId: item.productId, 
                                    quantity: item.quantity,  
                                }))
                            }
                        }
                    }
                    : {
                        // Si `user.cart` no existe creamos un carrito vacío
                        create: {
                            items: {
                                create: [] 
                            }
                        }
                    }
            },
            include: { cart: true }
        });
        return UserEntity.fromObject(newUser);  
    }

    public async update(user: UserEntity): Promise<UserEntity> {
        const { cart, ...userData } = user;  
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: userData,  
        });

        return UserEntity.fromObject(updatedUser);
    }

    public async delete( id: string ): Promise<void> {
        await prisma.user.delete({
            where: { id }
        });
        return;
    }
}