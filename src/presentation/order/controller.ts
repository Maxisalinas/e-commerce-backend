import { Request, Response } from 'express';
import type { CheckoutUseCase } from '../../application/order/interfaces/checkout-use-case.js';
import type { GetUserOrdersUseCase } from '../../application/order/interfaces/get-user-orders.js';
import type { GetAllOrdersUseCase } from '../../application/order/interfaces/get-all-orders-use-case.js';
import { CheckoutDTO } from './dtos/input/checkout.js';
import { OrderResponseDTO } from './dtos/output/response.js';
import { ChangeOrderStatusUseCase } from '../../application/order/interfaces/change-status-use-case.js';

export class OrderController {

    constructor(
        private readonly checkoutUseCase: CheckoutUseCase,
        private readonly getUserOrdersUseCase: GetUserOrdersUseCase,
        private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
        private readonly changeOrderStatusUseCase: ChangeOrderStatusUseCase,
    ){}
    
    public checkout = async ( req: Request, res: Response ) => {
        const userId: string = (req as any).payload.id;
        const checkoutDTO = new CheckoutDTO((req as any).bodyParsed);
        const order: OrderResponseDTO = await this.checkoutUseCase.execute(userId, checkoutDTO);
        return res.status(201).json(order);
    }
    
    
    public getUserOrders = async ( req: Request, res: Response ) => {
        const userId: string = (req as any).payload.id;
        const orders: OrderResponseDTO[]  = await this.getUserOrdersUseCase.execute(userId);
        return res.status(200).json(orders);
    }
    
    public getAllOrders = async ( req: Request, res: Response ) => {
        const orders: OrderResponseDTO[] = await this.getAllOrdersUseCase.execute();
        return res.status(200).json(orders);
    }
    
    public changeStatus = async ( req: Request, res: Response ) => {
        const orderId = (req as any).paramsParsed.id;
        const newStatus = (req as any).bodyParsed;
        const updatedOrder: OrderResponseDTO = await this.changeOrderStatusUseCase.execute(orderId, newStatus);
        return res.status(200).json(updatedOrder);
    }

    
    // public pay = async ( req: Request, res: Response ) => {
    //     const response = 'El pago de su pedido ha sido éxitoso.';
    //     return res.status(200).json(response);
    // }
    
    
}