import { prisma } from "../database/postgres/prisma-client.js";
import { UserRepository } from "../../domain/user/repository.js";
import { UserEntity } from "../../domain/user/entity.js";
import { UpdateUserDTO } from "../../presentation/user/dtos/input/update.js";
import type { UserFilter } from "../../application/user/interfaces/user-filter.js";
import { NotFoundError } from "../errors/notFoundError.js";

export class UserRepositoryImpl implements UserRepository {

    
    public async getById( id: string ): Promise<UserEntity> { 
        const user = await prisma.user.findUnique({
            where: {
                    id
                }
            });
        if (!user) throw new NotFoundError('No se encontró un usuario con el número de ID proporcionado.');
        return UserEntity.fromObject(user);
    }
          
    async getByEmail(email: string): Promise<UserEntity | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) return null;
        return UserEntity.fromObject(user);
    }
        
    public async getMany( filter: UserFilter ): Promise<UserEntity[]> {
        const users = await prisma.user.findMany({}); 
        if (!users) throw new NotFoundError(`No se encontraron usuarios.`);
        return UserEntity.fromObjectList(users);
    }
            
    public async register( user: UserEntity ): Promise<UserEntity> {

        const newUser = await prisma.user.create({
            data: user
        });
        return UserEntity.fromObject(newUser);
        
    }

    public async update(user: UserEntity): Promise<UserEntity> {
        
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                ...user,
            }
        });
        return UserEntity.fromObject(updatedUser);
    }

    public async delete( id: string ): Promise<void> {
        await this.getById(id);
        await prisma.user.delete({
            where: { id }
        });
        return;
    }
}