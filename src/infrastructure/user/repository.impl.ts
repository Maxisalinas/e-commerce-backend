import { prisma } from "../database/postgres/prisma-client.js";
import type { UserRepository } from "../../domain/user/repository.js";
import { UserMapper } from "./mapper.js";
import { UserEntity } from "../../domain/user/entity.js";
import type { UserFilter } from "../../application/user/interfaces/user-filter.js";
import { NotFoundError } from "../../application/errors/notFoundError.js";


export class UserRepositoryImpl implements UserRepository {

    public async getById(id: string): Promise<UserEntity> { 

        const user = await prisma.user.findUnique({
            where: { id },
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

        return UserMapper.toDomain(user);
    }
          
    async getByEmail(email: string): Promise<UserEntity | null> {

        const user = await prisma.user.findUnique({
            where: { email },
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
        
        return UserMapper.toDomain(user);
    }
        
    public async getMany(filter: UserFilter): Promise<UserEntity[]> {

        const users = await prisma.user.findMany(); // TODO FILTRAR
        if (!users) throw new NotFoundError(`No se encontraron usuarios.`);

        return UserMapper.toDomainFromList(users);
    }
            
    public async register(user: UserEntity): Promise<UserEntity> {

       const data = UserMapper.toPersistence(user);

        const newUser = await prisma.user.create({
            data: {
                ...data,
                cart: {
                    create: {}
                }
            },
            include: { cart: true }
        });

        return UserMapper.toDomain(newUser);
    }

    public async update(user: UserEntity): Promise<UserEntity> {

        const { cart, ...data } = UserMapper.toPersistence(user);

        const updatedUser = await prisma.user.update({
            where: { id: user.id! },
            data,
        });

        return UserMapper.toDomain(updatedUser);
    }

    public async delete(id: string): Promise<void> {
        await prisma.user.delete({
            where: { id }
        });
        return;
    }


}