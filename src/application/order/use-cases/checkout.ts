import type { CheckoutUseCase } from "../interfaces/checkout-use-case.js";
import type { CalculateShippingCostUseCase } from "../../shipping/interfaces/calculate-cost-use-case.js";
import type { CartRepository } from "../../../domain/cart/repository.js";
import type { OrderRepository } from "../../../domain/order/repository.js";
import { OrderEntity } from "../../../domain/order/entity.js";
import { OrderItemEntity } from "../../../domain/orderItem/entity.js";
import { Currency, Money } from "../../../domain/shared/value-objects/money.js";
import { CheckoutDTO } from "../../../presentation/order/dtos/input/checkout.js";
import { OrderResponseDTO } from "../../../presentation/order/dtos/output/response.js";
import { CartEmptyError } from "../../../domain/shared/errors/cartEmptyError.js";


export class Checkout implements CheckoutUseCase {

    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly cartRepository: CartRepository,
        private readonly calculateShippingCost: CalculateShippingCostUseCase
    ) {}


    public async execute(userId: string, checkoutDTO: CheckoutDTO): Promise<OrderResponseDTO> {

        const cart = await this.cartRepository.getByUserId(userId);
        if(!cart.items || cart.items.length === 0) throw new CartEmptyError('No se encontraron items seleccionados para generar un pedido.');

        const shippingCost = await this.calculateShippingCost.execute({
            items: cart.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            })),
            destination: checkoutDTO.shippingAddress,
            shippingMethodId: checkoutDTO.shippingMethodId
        });

        const discount = 10; // TODO: implementar logica de descuentos

        const orderItems = cart.items.map(item => OrderItemEntity.create({
            productId: item.productId,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity
        }));

        const order = OrderEntity.create({
            userId,
            items: orderItems,
            discount: Money.of(discount, 'USD' as Currency), // TODO: CHECKEAR
            shippingMethodId: checkoutDTO.shippingMethodId,
            shippingCost: Money.of(shippingCost, 'USD' as Currency), // TODO: CHECKEAR
            shippingAddress: checkoutDTO.shippingAddress,
            billingAddress: checkoutDTO.billingAddress,
            notes: checkoutDTO.notes,
        })

        const newOrder = await this.orderRepository.create(order);
        
        await this.cartRepository.clear(cart.id!);

        return OrderResponseDTO.fromEntity(newOrder);

    }

}