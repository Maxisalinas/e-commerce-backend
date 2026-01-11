import { CartEntity } from "../../../../domain/cart/entity.js";
import { CartItemResponseDTO } from "./item-response.js";

export class CartResponseDTO {
    
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly items: CartItemResponseDTO[],
        public readonly totalPrice: number
    ){}
    
    static fromEntity(cart: CartEntity): CartResponseDTO {
        return new CartResponseDTO(
            cart.id!,
            cart.userId,
            CartItemResponseDTO.fromEntityList(cart.items),
            cart.getTotal()  
        );
    }

    static fromEntityList(carts: CartEntity[]): CartResponseDTO[] {
        return carts.map(cart => CartResponseDTO.fromEntity(cart)); 
    }

}

