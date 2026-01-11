import { ShippingMethodEntity } from "./entity.js";

export abstract class ShippingMethodRepository {
    
    abstract addMethod(method: ShippingMethodEntity): Promise<ShippingMethodEntity>;
    abstract getMethodById(methodId: string): Promise<ShippingMethodEntity>;
    abstract getActiveMethods(): Promise<ShippingMethodEntity[]>;
    abstract updateMethod(method: ShippingMethodEntity): Promise<ShippingMethodEntity>;
    abstract deleteMethod(methodId: string): Promise<void>;
    
}