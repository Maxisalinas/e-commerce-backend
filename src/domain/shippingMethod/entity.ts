import { Money } from "../shared/value-objects/money.js";

export class ShippingMethodEntity {

    constructor(
        public readonly id: string | null,
        public readonly name: string,
        public readonly code: string,
        public readonly price: Money,
        public readonly estimatedDays: number,
        public readonly isActive: boolean
    ) {}

    public static create(params: {
        name: string;
        code: string;
        price: Money;
        estimatedDays: number;
        isActive: boolean;
    }): ShippingMethodEntity {
        return new ShippingMethodEntity(
            null,
            params.name,
            params.code,
            params.price,
            params.estimatedDays,
            params.isActive
        );
    }
}
