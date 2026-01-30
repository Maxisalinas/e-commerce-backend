import { OrderEntity } from "../../domain/order/entity.js";
import { OrderItemEntity } from "../../domain/orderItem/entity.js";
import { Money } from "../../domain/shared/value-objects/money.js";

export class OrderMapper {

    static toDomain(dbOrder: any): OrderEntity {
        const currency = dbOrder.currency;

        return new OrderEntity(
            dbOrder.id,
            dbOrder.userId,
            dbOrder.shippingMethodId,
            dbOrder.status,
            dbOrder.paymentStatus,
            OrderItemMapper.toDomainFromList(dbOrder.items),
            Money.of(dbOrder.discount, currency),
            Money.of(dbOrder.shippingCost, currency),
            dbOrder.shippingAddress,
            dbOrder.billingAddress,
            dbOrder.notes,
            dbOrder.createdAt,
            dbOrder.updatedAt
        );
    }


    static toPersistence(order: OrderEntity) {
        const currency = order.totalAmount.currency;

        return {
            userId: order.userId,
            shippingMethodId: order.shippingMethodId,

            status: order.status,
            paymentStatus: order.paymentStatus,

            totalAmount: order.totalAmount.value,
            discount: order.discount.value,
            shippingCost: order.shippingCost.value,
            currency,

            // Shipping
            shippingName: order.shippingAddress.name,
            shippingStreet: order.shippingAddress.street,
            shippingCity: order.shippingAddress.city,
            shippingState: order.shippingAddress.state,
            shippingPostalCode: order.shippingAddress.postalCode,
            shippingCountry: order.shippingAddress.country,
            shippingPhone: order.shippingAddress.phone,

            // Billing
            billingName: order.billingAddress.name,
            billingStreet: order.billingAddress.street,
            billingCity: order.billingAddress.city,
            billingState: order.billingAddress.state,
            billingPostalCode: order.billingAddress.postalCode,
            billingCountry: order.billingAddress.country,

            // Items
            items: {
                create: order.items.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price.value,
                    subtotal: item.subtotal.value,
                    currency,
                }))
            },

            notes: order.notes,
        };
    }



    static toDomainFromList(dbOrders: any[]): OrderEntity[] {
        return dbOrders.map(order => this.toDomain(order));
    }

    static toPersistenceFromList(orders: OrderEntity[]) {
        return orders.map(order => this.toPersistence(order));
    }


}

export class OrderItemMapper {

    static toDomain(dbOrderItem: any): OrderItemEntity {
        return new OrderItemEntity(
            dbOrderItem.id,
            dbOrderItem.orderId,
            dbOrderItem.productId,
            dbOrderItem.name,
            Money.of(dbOrderItem.price, dbOrderItem.currency),
            dbOrderItem.quantity,
        );
    }


    static toPersistence(orderItem: OrderItemEntity) {
        return {
            orderId: orderItem.orderId,
            productId: orderItem.productId,
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
        };
    }

    static toDomainFromList(dbOrderItems: any[]): OrderItemEntity[] {
        return dbOrderItems.map(item => this.toDomain(item));
    }

    static toPersistenceFromList(orderItems: OrderItemEntity[]) {
        return orderItems.map(item => this.toPersistence(item));
    }

}


