import type { GetUserOrdersUseCase } from "../interfaces/get-user-orders.js";
import { OrderRepository } from "../../../domain/order/repository.js";
import { OrderResponseDTO } from "../../../presentation/order/dtos/output/response.js";

export class GetUserOrders implements GetUserOrdersUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
    ) {}


    public async execute(userId: string): Promise<OrderResponseDTO[]> {

        const orders = await this.orderRepository.getByUserId(userId);
        
        return OrderResponseDTO.fromEntityList(orders);
    }

}