
import { CartResponseDTO } from "../../../presentation/cart/dtos/output/response.js";

export interface ClearCartUseCase {
    execute(id: string): Promise<CartResponseDTO>;
}