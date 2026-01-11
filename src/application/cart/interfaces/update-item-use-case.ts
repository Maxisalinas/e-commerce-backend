
import { UpdateCartItemDTO } from "../../../presentation/cart/dtos/input/update-item.js";
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";

export interface UpdateCartItemUseCase {
    execute(id: string, updateCartItemDTO: UpdateCartItemDTO): Promise<CartResponseDTO>;
}

