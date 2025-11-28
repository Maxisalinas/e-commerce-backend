import { CartEntity } from "../../../../domain/cart/entity.js";
import { CartItemResponseDTO } from "./item-response.js";


export class CartResponseDTO {
    public readonly id!: string;
    public readonly items!: CartItemResponseDTO[];
    public readonly totalPrice!: number;

    constructor(cart: CartEntity) {

        const { userId, createdAt, updatedAt, ...cartData } = cart;

        Object.assign(this, cartData);

        this.items = cart.items ? cart.items.map(item => new CartItemResponseDTO(item)) : [];
        
        this.totalPrice = cart.getTotal();  
    }
}
