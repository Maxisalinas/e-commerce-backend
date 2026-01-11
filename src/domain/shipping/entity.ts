export class ShippingEntity {

    constructor(
        public readonly id: string | null,
        public readonly orderId: string,
        public readonly shippingMethodId: string,
        public status: string,
        public readonly trackingNumber?: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,

    ) {}

    public static create(params: {
        id: string | null;
        orderId: string;
        shippingMethodId: string;
        status: string;
        trackingNumber?: string;
        createdAt?: Date;
        updatedAt?: Date;
    }): ShippingEntity {
        return new ShippingEntity(
            null,
            params.orderId,
            params.shippingMethodId,
            params.status,
            params.trackingNumber,
        );
    }


    public changeStatus(newStatus: string) {
        const allowedStatuses = ["PENDING", "IN_TRANSIT", "DELIVERED", "FAILED"];
        if (!allowedStatuses.includes(newStatus)) {
            throw new Error(`Estado de envío no permitido: ${newStatus}`);
        }
        this.status = newStatus;
    }

}
