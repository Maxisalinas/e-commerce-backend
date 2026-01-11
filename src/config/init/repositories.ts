import type { Repositories } from "../interfaces/repositories.js";
import { ProductRepositoryImpl } from "../../infrastructure/product/repository.impl.js";
import { CategoryRepositoryImpl } from "../../infrastructure/category/repository.impl.js";
import { UserRepositoryImpl } from "../../infrastructure/user/repository.impl.js";
import { CartRepositoryImpl } from "../../infrastructure/cart/repository.impl.js";
import { OrderRepositoryImpl } from "../../infrastructure/order/repository.impl.js";
import { ShippingRepositoryImpl } from "../../infrastructure/shipping/repository.impl.js";
import { ShippingMethodRepositoryImpl } from "../../infrastructure/shippingMethod/repository.impl.js";

export function initRepositories(): Repositories {
    return {
        productRepository: new ProductRepositoryImpl(),
        categoryRepository: new CategoryRepositoryImpl(),
        userRepository: new UserRepositoryImpl(),
        cartRepository: new CartRepositoryImpl(),
        orderRepository: new OrderRepositoryImpl(),
        shippingRepository: new ShippingRepositoryImpl(),
        shippingMethodRepository: new ShippingMethodRepositoryImpl()
    }
}