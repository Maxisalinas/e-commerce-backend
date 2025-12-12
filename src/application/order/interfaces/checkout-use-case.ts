import { CheckoutDTO } from "../../../presentation/order/dtos/input/checkout.js";
import { OrderResponseDTO } from "../../../presentation/order/dtos/output/response.js";

export interface CheckoutUseCase {
    execute(userId: string, checkoutDTO: CheckoutDTO): Promise<OrderResponseDTO>;
}
