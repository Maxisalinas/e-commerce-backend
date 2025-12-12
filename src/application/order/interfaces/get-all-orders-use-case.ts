import { OrderResponseDTO } from "../../../presentation/order/dtos/output/response.js";

export interface GetAllOrdersUseCase {
    execute(): Promise<OrderResponseDTO[]>;
}
