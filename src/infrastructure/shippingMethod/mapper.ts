import { ShippingMethodEntity } from "../../domain/shippingMethod/entity.js";
import { Currency } from "../../domain/shared/value-objects/currency.js";
import { Money } from "../../domain/shared/value-objects/money.js";


export class ShippingMethodMapper {

    static toDomain(dbShippingMethod: any): ShippingMethodEntity {
        return new ShippingMethodEntity(
            dbShippingMethod.id,
            dbShippingMethod.name,
            dbShippingMethod.code,
            Money.of(dbShippingMethod.price, dbShippingMethod.currency as Currency),
            dbShippingMethod.estimatedDays,
            dbShippingMethod.isActive
        );
    }

    static toPersistence(shippingMethod: ShippingMethodEntity) {
        return {
            name: shippingMethod.name,
            code: shippingMethod.code,
            price: shippingMethod.price.value,
            currency: shippingMethod.price.currency,
            estimatedDays: shippingMethod.estimatedDays,
            isActive: shippingMethod.isActive
        };
    }

    static toDomainFromList(dbShippingMethods: any[]): ShippingMethodEntity[] {
        return dbShippingMethods.map(method => this.toDomain(method));
    }

    static toPersistenceFromList(shippingMethods: ShippingMethodEntity[]) {
        return shippingMethods.map(method => this.toPersistence(method));
    }

}
