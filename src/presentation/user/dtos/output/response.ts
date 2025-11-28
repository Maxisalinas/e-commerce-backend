import { UserEntity } from "../../../../domain/user/entity.js";
import { CartResponseDTO } from "../../../cart/dtos/output/response.js";

export class UserResponseDTO {
    public readonly id!: string;
    public readonly name!: string;
    public readonly email!: string;
    public readonly role!: string;
    public readonly cart!: CartResponseDTO;

    constructor(user: UserEntity) {

        // Excluimos el campo `password` y extraemos los datos necesarios
        const { password, createdAt, updatedAt,...userData } = user;

        // Asignamos las propiedades del objeto userData al DTO
        Object.assign(this, userData);

        this.cart = new CartResponseDTO(user.cart!);

    }
}

