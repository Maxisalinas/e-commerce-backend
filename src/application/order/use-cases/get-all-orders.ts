
import type { GetAllOrdersUseCase } from "../interfaces/get-all-orders-use-case.js";
import { OrderRepository } from "../../../domain/order/repository.js";
import { OrderResponseDTO } from "../../../presentation/order/dtos/output/response.js";

export class GetAllOrders implements GetAllOrdersUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
    ) {}


    public async execute(): Promise<OrderResponseDTO[]> {
        
        const orders = await this.orderRepository.getAll();
        
        return OrderResponseDTO.fromEntityList(orders);
        
    }

}