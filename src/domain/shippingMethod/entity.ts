
export class ShippingMethodEntity {

    constructor(
        public readonly id: string | null,
        public readonly name: string,
        public readonly code: string,
        public readonly price: number,
        public readonly estimatedDays: number,
        public readonly isActive: boolean
    ){}

    public static create(params: {
        id: string | null;
        name: string;
        code: string;
        price: number;
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
