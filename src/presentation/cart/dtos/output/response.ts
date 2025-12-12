import { CartEntity } from "../../../../domain/cart/entity.js";
import { CartItemResponseDTO } from "./item-response.js";

export class CartResponseDTO {
    public readonly id: string;
    public readonly userId: string;
    public readonly items: CartItemResponseDTO[];
    public readonly totalPrice: number;

    constructor(cart: CartEntity) {
        this.id = cart.id;
        this.userId = cart.userId;
        this.items = CartItemResponseDTO.fromEntityList(cart.items);
        this.totalPrice = cart.getTotal();  
    }
}
