import { OrderEntity } from "../../../../domain/order/entity.js";
import { OrderItemResponseDTO } from "./item-response.js";

export class OrderResponseDTO {
    
    
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly status: string,
        public readonly paymentStatus: string,
        public readonly items: OrderItemResponseDTO[],
        public readonly discount: number,
        public readonly shippingCost: number,
        public readonly totalAmount: number,
        public readonly shippingAddress: any,
        public readonly billingAddress: any,
        public readonly createdAt: Date,
        public readonly notes?: string,

    ) {}
    
    static fromEntity(order: OrderEntity): OrderResponseDTO {
        return new OrderResponseDTO(
            order.id!,
            order.userId,
            order.status,
            order.paymentStatus,
            OrderItemResponseDTO.fromEntityList(order.items),
            order.discount,
            order.shippingCost,
            order.totalAmount,
            order.shippingAddress,
            order.billingAddress,
            order.createdAt!,
            order.notes,
        );
    }
    
    static fromEntityList(orders: OrderEntity[]): OrderResponseDTO[] {
        return orders.map(order => OrderResponseDTO.fromEntity(order)); 
    }
    
    
    
    
    
    
    
    
    
}



export class ProductResponseDTO {
    
    
}