import { ShippingEntity } from "./entity.js";

export abstract class ShippingRepository {

    abstract getById(id: string): Promise<ShippingEntity | null>;
    abstract getByOrderId(orderId: string): Promise<ShippingEntity | null>;
    abstract create(shipping: ShippingEntity): Promise<ShippingEntity>;
    abstract update(shipping: ShippingEntity): Promise<ShippingEntity>;
    
}