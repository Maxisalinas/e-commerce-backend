import type { Repositories } from "../interfaces/repositories.js";
import type { UseCases } from "../interfaces/use-cases.js";
// Product
import { CreateProduct } from "../../application/product/use-cases/create.js";
import { GetProductById } from "../../application/product/use-cases/get-by-id.js";
import { GetManyProducts } from "../../application/product/use-cases/getmany.js";
import { UpdateProduct } from "../../application/product/use-cases/update.js";
import { DeleteProduct } from "../../application/product/use-cases/delete.js";
// Category
import { CreateCategory } from "../../application/category/use-cases/create.js";
import { GetCategoryById } from "../../application/category/use-cases/get-by-id.js";
import { GetManyCategories } from "../../application/category/use-cases/getmany.js";
import { UpdateCategory } from "../../application/category/use-cases/update.js";
import { DeleteCategory } from "../../application/category/use-cases/delete.js";
// User
import { RegisterUser } from "../../application/user/use-cases/register.js";
import { GetUserById } from "../../application/user/use-cases/get-by-id.js";
import { GetManyUsers } from "../../application/user/use-cases/getmany.js";
import { UpdateUser } from "../../application/user/use-cases/update.js";
import { DeleteUser } from "../../application/user/use-cases/delete.js";
// auth
import { LoginUser } from "../../application/auth/use-cases/login.js";
import { RefreshToken } from "../../application/auth/use-cases/refresh-token.js";
import { BcryptHasher } from "../../infrastructure/helpers/bcrypt-hasher.js";
import { JsonWebToken } from "../../infrastructure/helpers/jsonwebtoken-jwt-generator.js";
// Cart
import { GetCartById } from "../../application/cart/usecases/get-by-id.js";
import { GetCartByUserId } from "../../application/cart/usecases/get-by-user-id.js";
import { AddCartItem } from "../../application/cart/usecases/add-item.js";
import { RemoveCartItem } from "../../application/cart/usecases/remove-item.js";
import { UpdateCartItem } from "../../application/cart/usecases/update-item.js";
import { ClearCart } from "../../application/cart/usecases/clear.js";
// Order
import { Checkout } from "../../application/order/use-cases/checkout.js";
import { GetUserOrders } from "../../application/order/use-cases/get-user-orders.js";
import { GetAllOrders } from "../../application/order/use-cases/get-all-orders.js";
import { ChangeOrderStatus } from "../../application/order/use-cases/change-status.js";



export function initUseCases(repositories: Repositories): UseCases {

    const { productRepository, categoryRepository, userRepository, cartRepository, orderRepository } = repositories;
    
    const passwordHasher = new BcryptHasher();

    return {
        // Product
        getProductByIdUseCase: new GetProductById(productRepository),
        getManyProductsUseCase: new GetManyProducts(productRepository),
        createProductUseCase: new CreateProduct(productRepository),
        updateProductUseCase: new UpdateProduct(productRepository),
        deleteProductUseCase: new DeleteProduct(productRepository),
        // Category
        createCategoryUseCase: new CreateCategory(categoryRepository),
        getManyCategoriesUseCase: new GetManyCategories(categoryRepository),
        getCategoryByIdUseCase: new GetCategoryById(categoryRepository),
        updateCategoryUseCase: new UpdateCategory(categoryRepository),
        deleteCategoryUseCase: new DeleteCategory(categoryRepository),
        // Users
        getUserByIdUseCase: new GetUserById(userRepository),
        getManyUsersUseCase: new GetManyUsers(userRepository),
        registerUserUseCase: new RegisterUser(userRepository, passwordHasher),
        updateUserUseCase: new UpdateUser(userRepository),
        deleteUserUseCase: new DeleteUser(userRepository),
        // auth
        loginUserUseCase: new LoginUser(userRepository, cartRepository, passwordHasher, JsonWebToken,),
        refreshTokenUseCase: new RefreshToken(JsonWebToken),
        // Cart
        getCartByIdUseCase: new GetCartById(cartRepository),
        getCartByUserIdUseCase: new GetCartByUserId(cartRepository),
        clearCartUseCase: new ClearCart(cartRepository),
        addCartItemUseCase: new AddCartItem(cartRepository, productRepository),
        updateCartItemUseCase: new UpdateCartItem(cartRepository),
        removeCartItemUseCase: new RemoveCartItem(cartRepository),
        // Order
        checkoutUseCase: new Checkout(orderRepository, cartRepository),
        getUserOrdersUseCase: new GetUserOrders(orderRepository),
        getAllOrdersUseCase: new GetAllOrders(orderRepository),
        changeOrderStatusUseCase: new ChangeOrderStatus(orderRepository)
    }

}
