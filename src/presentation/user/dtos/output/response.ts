import { UserEntity } from "../../../../domain/user/entity.js";
import { CartResponseDTO } from "../../../cart/dtos/output/response.js";

export class UserResponseDTO {
    public readonly id: string;
    public readonly name: string;
    public readonly email: string;
    public readonly role: string;
    public readonly cart: CartResponseDTO;

    private constructor(id: string, name: string, email: string, role: string, cart: CartResponseDTO) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.cart = cart;
    }

    static fromEntity(user: UserEntity): UserResponseDTO {
        const cart = new CartResponseDTO(user.cart!);  
        return new UserResponseDTO(
            user.id!,
            user.name,
            user.email,
            user.role,
            cart
        );
    }

    static fromEntityList(users: UserEntity[]): UserResponseDTO[] {
        return users.map(user => this.fromEntity(user)); 
    }
}
