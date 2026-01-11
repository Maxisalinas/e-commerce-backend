
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";

export interface RemoveCartItemUseCase {
    execute(id: string): Promise<CartResponseDTO>;
}