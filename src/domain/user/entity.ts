import { CartEntity } from "../cart/entity.js";

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export class UserEntity {
    constructor(
        public readonly id: string | null,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: Role,
        public readonly cart: CartEntity | null,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}
    
    public static create(params: {
        id: string | null;
        name: string;
        email: string;
        password: string;
    }): UserEntity {
        return new UserEntity(
            null,
            params.name,
            params.email,
            params.password,
            Role.USER,
            null,
        );
    }

}


