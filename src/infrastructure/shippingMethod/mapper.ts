import { ShippingMethodEntity } from "../../domain/shippingMethod/entity.js";


export class ShippingMethodMapper {
    
    static toDomain(dbShippingMethod: any): ShippingMethodEntity {
        return new ShippingMethodEntity(
            dbShippingMethod.id,
            dbShippingMethod.name,
            dbShippingMethod.code,
            dbShippingMethod.price,
            dbShippingMethod.estimatedDays,
            dbShippingMethod.isActive   
        );
    }

    static toPersistence(shippingMethod: ShippingMethodEntity) {
        return {
            name: shippingMethod.name,
            code: shippingMethod.code,
            price: shippingMethod.price,
            estimatedDays: shippingMethod.estimatedDays, 
            isActive: shippingMethod.isActive
        };
    }

    

    static toDomainFromList(dbShippingMethod: any[]): ShippingMethodEntity[] {
        return dbShippingMethod.map(method => this.toDomain(method));
    }
    
    static toPersistenceFromList(shippingMethod: ShippingMethodEntity[]) {
        return shippingMethod.map(method => this.toPersistence(method));
    }

}

