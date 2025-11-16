
export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export class UserEntity {
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly id?: string,
        public readonly role?: Role,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {}

    public static fromObject(object: any): UserEntity {
        const { id, name, email, password, role, createdAt, updatedAt } = object;
        return new UserEntity(
            name, 
            email, 
            password, 
            id, 
            role, 
            createdAt, 
            updatedAt
        );
    }

    public static fromObjectList(objects: any[]): UserEntity[] {
        return objects.map(obj => UserEntity.fromObject(obj));
    }

}
