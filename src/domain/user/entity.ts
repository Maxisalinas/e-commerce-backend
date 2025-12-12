import { CartEntity } from "../cart/entity.js";

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export class UserEntity {
    constructor(
        public readonly id: string | undefined,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: Role = Role.USER,
        public readonly cart: CartEntity | null,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}
    
    public static create(params: { name: string, email: string, password: string }): UserEntity {
        
        return new UserEntity(
            undefined,
            params.name,
            params.email,
            params.password,
            Role.USER,
            null,
        );
    }

    public static fromObject(object: any): UserEntity {

        const { id, name, email, password, role, createdAt, updatedAt, cart } = object;
        
        return new UserEntity(
            id,
            name, 
            email,
            password, 
            role, 
            CartEntity.fromObject(cart),
            createdAt, 
            updatedAt
        );
    }

    public static fromObjectList(objects: any[]): UserEntity[] {
        return objects.map(obj => UserEntity.fromObject(obj));
    }

}


