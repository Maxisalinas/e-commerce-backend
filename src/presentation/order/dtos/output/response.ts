import { OrderEntity } from "../../../../domain/order/entity.js";
import { OrderItemResponseDTO } from "./item-response.js";

export class OrderResponseDTO {
    
    
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly items: OrderItemResponseDTO[],
        public readonly totalAmount: number,
        public readonly shippingCost: number,
        public readonly discount: number,
        public readonly status: string,
        public readonly paymentStatus: string,
        public readonly shippingAddress: any,
        public readonly billingAddress: any,
        public readonly notes: string | undefined,
        public readonly createdAt: Date,

    ) {
    }
    
    
    static fromEntity(order: OrderEntity): OrderResponseDTO {
        return new OrderResponseDTO(
            order.id!,
            order.userId,
            OrderItemResponseDTO.fromEntityList(order.items),
            order.totalAmount.toNumber(),
            order.shippingCost.toNumber(),
            order.discount.toNumber(),
            order.status,
            order.paymentStatus,
            order.shippingAddress,
            order.billingAddress,
            order.notes,
            order.createdAt!,
        );
    }
    
    static fromEntityList(orders: OrderEntity[]): OrderResponseDTO[] {
        return orders.map(order => OrderResponseDTO.fromEntity(order)); 
    }
    
    
    
    
    
    
    
    
    
}



export class ProductResponseDTO {
    
    
}