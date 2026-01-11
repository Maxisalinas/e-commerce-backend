import { CartResponseDTO } from "../../../cart/dtos/output/response.js";
import { UserResponseDTO } from "../../../user/dtos/output/response.js";

export class LoginResponseDTO {

    constructor(
        public readonly user: UserResponseDTO,
        public readonly accessToken: string,
        public readonly refreshToken: string,
        public readonly cart: CartResponseDTO
    ) {}

}