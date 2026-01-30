import type { CartRepository } from "../../domain/cart/repository.js";
import type { CategoryRepository } from "../../domain/category/repository.js";
import type { OrderRepository } from "../../domain/order/repository.js";
import type { PaymentRepository } from "../../domain/payment/repository.js";
import type { ProductRepository } from "../../domain/product/repository.js";
import type { ShippingRepository } from "../../domain/shipping/repository.js";
import type { ShippingMethodRepository } from "../../domain/shippingMethod/repository.js";
import type { UserRepository } from "../../domain/user/repository.js";

export interface Repositories {
    
    productRepository: ProductRepository;
    categoryRepository: CategoryRepository;
    userRepository: UserRepository;
    cartRepository: CartRepository;
    orderRepository: OrderRepository;
    shippingRepository: ShippingRepository;
    shippingMethodRepository: ShippingMethodRepository;
    paymentRepository: PaymentRepository;

}
