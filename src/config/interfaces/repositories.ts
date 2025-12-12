import { CartRepository } from "../../domain/cart/repository.js";
import { CategoryRepository } from "../../domain/category/repository.js";
import { OrderRepository } from "../../domain/order/repository.js";
import { ProductRepository } from "../../domain/product/repository.js";
import { UserRepository } from "../../domain/user/repository.js";

export interface Repositories {
  productRepository: ProductRepository;
  categoryRepository: CategoryRepository;
  userRepository: UserRepository;
  cartRepository: CartRepository;
  orderRepository: OrderRepository;
}
