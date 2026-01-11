import { OrderItemEntity } from "../../../../domain/orderItem/entity.js";

export class OrderItemResponseDTO {
    
    constructor(
        public readonly productId: number,
        public readonly name: string,
        public readonly price: number,
        public readonly quantity: number,
        public readonly subtotal: number
    ) {}

    static fromEntity(item: OrderItemEntity): OrderItemResponseDTO {
        return new OrderItemResponseDTO(
            item.productId,
            item.name,
            item.price,
            item.quantity,
            item.subtotal
        );
    }

    static fromEntityList(items: OrderItemEntity[]): OrderItemResponseDTO[] {
        return items.map(item => OrderItemResponseDTO.fromEntity(item));
    }

}
