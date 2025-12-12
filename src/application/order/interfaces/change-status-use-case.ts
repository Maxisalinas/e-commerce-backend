import { OrderResponseDTO } from "../../../presentation/order/dtos/output/response.js";

export interface ChangeOrderStatusUseCase {
    execute(orderId: string, newStatus: string): Promise<OrderResponseDTO>;
}
