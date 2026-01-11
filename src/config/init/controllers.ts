import type { Controllers } from "../interfaces/controllers.js";
import type { UseCases } from "../interfaces/use-cases.js";
import { AuthController } from "../../presentation/auth/controller.js";
import { CartController } from "../../presentation/cart/controller.js";
import { CategoryController } from "../../presentation/category/controller.js";
import { OrderController } from "../../presentation/order/controller.js";
import { ProductController } from "../../presentation/product/controller.js";
import { ShippingController } from "../../presentation/shipping/controller.js";
import { ShippingMethodController } from "../../presentation/shippingMethod/controller.js";
import { UserController } from "../../presentation/user/controller.js";

export function initControllers(usecases: UseCases): Controllers {

    return {
        productController: new ProductController(
            usecases.getProductByIdUseCase,
            usecases.getManyProductsUseCase,
            usecases.createProductUseCase,
            usecases.updateProductUseCase,
            usecases.deleteProductUseCase
        ),
        categoryController: new CategoryController(
            usecases.getCategoryByIdUseCase,
            usecases.getManyCategoriesUseCase,
            usecases.createCategoryUseCase,
            usecases.updateCategoryUseCase,
            usecases.deleteCategoryUseCase,
        ),
        userController: new UserController(
            usecases.getUserByIdUseCase,
            usecases.getManyUsersUseCase,
            usecases.registerUserUseCase,
            usecases.updateUserUseCase,
            usecases.deleteUserUseCase
        ),
        authController: new AuthController(
            usecases.getUserByIdUseCase,
            usecases.loginUserUseCase,
            usecases.refreshTokenUseCase
        ),
        cartController: new CartController(
            usecases.getCartByIdUseCase,
            usecases.getCartByUserIdUseCase,
            usecases.clearCartUseCase,
            usecases.addCartItemUseCase,
            usecases.updateCartItemUseCase,
            usecases.removeCartItemUseCase
        ),
        orderController: new OrderController(
            usecases.checkoutUseCase,
            usecases.getUserOrdersUseCase,
            usecases.getAllOrdersUseCase,
            usecases.changeOrderStatusUseCase
        ),
        shippingController: new ShippingController(
            usecases.calculateShippingCostUseCase
        ),
        shippingMethodController: new ShippingMethodController(
            usecases.addShippingMethodUseCase,
            usecases.getShippingMethodByIdUseCase,
            usecases.getActiveShippingMethodsUseCase,
            usecases.updateShippingMethodUseCase,
            usecases.deleteShippingMethodUseCase,
        )
    }

}
