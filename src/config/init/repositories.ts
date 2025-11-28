import { CartRepositoryImpl } from "../../infrastructure/cart/repository.impl.js";
import { CategoryRepositoryImpl } from "../../infrastructure/category/repository.impl.js";
import { ProductRepositoryImpl } from "../../infrastructure/product/repository.impl.js";
import { UserRepositoryImpl } from "../../infrastructure/user/repository.impl.js";
import { Repositories } from "../interfaces/repositories.js";

export function initRepositories(): Repositories {
    return {
        productRepository: new ProductRepositoryImpl(),
        categoryRepository: new CategoryRepositoryImpl(),
        userRepository: new UserRepositoryImpl(),
        cartRepository: new CartRepositoryImpl()
    };
}