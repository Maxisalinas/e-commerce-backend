
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";

export interface GetCartByIdUseCase {
    execute(id: string): Promise<CartResponseDTO>;
}