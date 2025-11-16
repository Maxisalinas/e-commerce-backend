import { UserEntity } from "../../../../domain/user/entity.js";

export class UserResponseDTO {

    public readonly id: string;
    public readonly name: string;
    public readonly email: string;
    public readonly role: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date;
    

    constructor(user: UserEntity) {
        this.id = user.id!;
        this.name = user.name;
        this.email = user.email;
        this.role = user.role!;
        this.createdAt = user.createdAt!;
        this.updatedAt = user.updatedAt!;
    }

}