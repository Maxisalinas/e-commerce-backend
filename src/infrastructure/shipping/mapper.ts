import { ShippingEntity } from "../../domain/shipping/entity.js";


export class ShippingMapper {
    
    static toDomain(dbShipping: any): ShippingEntity {
        return new ShippingEntity(
            dbShipping.id,
            dbShipping.orderId,
            dbShipping.shippingMethodId,
            dbShipping.status,
            dbShipping.trackingNumber,
            dbShipping.createdAt,
            dbShipping.updatedAt
        );
    }

    static toPersistence(shipping: ShippingEntity) {
        return {
            orderId: shipping.orderId,
            shippingMethodId: shipping.shippingMethodId,
            status: shipping.status,
            trackingNumber: shipping.trackingNumber,
            createdAt: shipping.createdAt,
            updatedAt: shipping.updatedAt
        };
    }

    static toDomainFromList(dbShippings: any[]): ShippingEntity[] {
        return dbShippings.map(shipping => this.toDomain(shipping));
    }
    
    static toPersistenceFromList(shippings: ShippingEntity[]) {
        return shippings.map(shipping => this.toPersistence(shipping));
    }

}

