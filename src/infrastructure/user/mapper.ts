import { UserEntity } from "../../domain/user/entity.js";

export class UserMapper {
    
    static toDomain(dbUser: any): UserEntity {
        return new UserEntity(
            dbUser.id,
            dbUser.name,
            dbUser.email,
            dbUser.password,
            dbUser.role,
            dbUser.cart,
            dbUser.createdAt,
            dbUser.updatedAt
        );
    }
    
    static toPersistence(user: UserEntity) {
        return {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
            cart: user.cart,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }


    static toDomainFromList(dbUsers: any[]): UserEntity[] {
        return dbUsers.map(user => this.toDomain(user));
    }

    static toPersistenceFromList(users: UserEntity[]) {
        return users.map(user => this.toPersistence(user));
    }

}

