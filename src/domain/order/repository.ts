import { OrderEntity } from "./entity.js";

export abstract class OrderRepository {
    
    abstract create(order: OrderEntity): Promise<OrderEntity>;
    abstract getById(orderId: string): Promise<OrderEntity>;
    abstract getByUserId(userId: string): Promise<OrderEntity[]>;
    abstract getAll(): Promise<OrderEntity[]>;
    abstract update(order: OrderEntity): Promise<OrderEntity>;
    
}