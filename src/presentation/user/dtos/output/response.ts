import { UserEntity } from "../../../../domain/user/entity.js";

export class UserResponseDTO {
    
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly role: string,

    ) {}

    static fromEntity(user: UserEntity): UserResponseDTO {
        return new UserResponseDTO(
            user.id!,
            user.name,
            user.email,
            user.role,
        );
    }

    static fromEntityList(users: UserEntity[]): UserResponseDTO[] {
        return users.map(user => this.fromEntity(user)); 
    }


    
}
