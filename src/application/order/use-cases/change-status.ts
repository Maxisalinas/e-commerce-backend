import { OrderRepository } from "../../../domain/order/repository.js";
import { OrderResponseDTO } from "../../../presentation/order/dtos/output/response.js";
import { ChangeOrderStatusUseCase } from "../interfaces/change-status-use-case.js";

export class ChangeOrderStatus implements ChangeOrderStatusUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
    ) {}


    public async execute(orderId: string, newStatus: string): Promise<OrderResponseDTO> {

        const order = await this.orderRepository.getById(orderId);
        order.changeStatus(newStatus);
        const updatedOrder = await this.orderRepository.update(order);
        
        return OrderResponseDTO.fromEntity(updatedOrder);

    }

}