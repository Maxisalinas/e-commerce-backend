import { ProductController } from "../../presentation/product/controller.js";
import { CategoryController } from "../../presentation/category/controller.js";
import { AuthController } from "../../presentation/auth/controller.js";
import { CartController } from "../../presentation/cart/controller.js";
import { OrderController } from "../../presentation/order/controller.js";
import { UserController } from "../../presentation/user/controller.js";
import { ShippingController } from "../../presentation/shipping/controller.js";
import { ShippingMethodController } from "../../presentation/shippingMethod/controller.js";

export interface Controllers {
    productController: ProductController;
    categoryController: CategoryController;
    userController: UserController;
    authController: AuthController;
    cartController: CartController;
    orderController: OrderController;
    shippingController: ShippingController;
    shippingMethodController: ShippingMethodController
    
}