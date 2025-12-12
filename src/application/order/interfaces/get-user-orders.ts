import { OrderResponseDTO } from "../../../presentation/order/dtos/output/response.js";

export interface GetUserOrdersUseCase {
    execute(userId: string): Promise<OrderResponseDTO[]>;
}
