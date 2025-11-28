import { AuthController } from "../../presentation/auth/controller.js";
import { CartController } from "../../presentation/cart/controller.js";
import { CategoryController } from "../../presentation/category/controller.js";
import { ProductController } from "../../presentation/product/controller.js";
import { UserController } from "../../presentation/user/controller.js";

export interface Controllers {
    productController: ProductController;
    categoryController: CategoryController;
    userController: UserController;
    authController: AuthController;
    cartController: CartController;
}