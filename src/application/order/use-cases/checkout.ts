import type { CheckoutUseCase } from "../interfaces/checkout-use-case.js";
import { Decimal } from "@prisma/client/runtime/library";
import { CartRepository } from "../../../domain/cart/repository.js";
import { OrderRepository } from "../../../domain/order/repository.js";
import { OrderEntity } from "../../../domain/order/entity.js";
import { OrderItemEntity } from "../../../domain/orderItem/entity.js";
import { CheckoutDTO } from "../../../presentation/order/dtos/input/checkout.js";
import { OrderResponseDTO } from "../../../presentation/order/dtos/output/response.js";
import { CartEmptyError } from "../../../domain/order/errors/cartEmptyError.js";


export class Checkout implements CheckoutUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly cartRepository: CartRepository,
    ) {}


    public async execute(userId: string, checkoutDTO: CheckoutDTO): Promise<OrderResponseDTO> {

        const cart = await this.cartRepository.getByUserId(userId);
        if(!cart.items || cart.items.length === 0) throw new CartEmptyError('No se encontraron items seleccionados para generar un pedido.');
        
        const shippingCost = new Decimal(15);
        const discount = new Decimal(10);
        const orderItems = OrderItemEntity.fromCartItemList(cart.items);
        
        const order = OrderEntity.create({
            userId,
            items: orderItems,
            shippingAddress: checkoutDTO.shippingAddress,
            billingAddress: checkoutDTO.billingAddress,
            shippingCost,
            discount,
            notes: checkoutDTO.notes
        });

        await this.cartRepository.clear(cart.id);
        
        const newOrder = await this.orderRepository.create(order);

        return OrderResponseDTO.fromEntity(newOrder);

    }

}