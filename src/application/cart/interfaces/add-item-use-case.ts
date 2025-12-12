import { AddCartItemDTO } from "../../../presentation/cart/dtos/input/add-item.js";
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";

export interface AddCartItemUseCase {
    execute( userId: string, addCartItemDTO: AddCartItemDTO ): Promise<CartResponseDTO>;
}
