
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";

export interface GetCartByUserIdUseCase {
    execute(id: string): Promise<CartResponseDTO>;
}