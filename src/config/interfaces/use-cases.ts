// Product
import type { CreateProductUseCase } from "../../application/product/interfaces/create-use-case.js";
import type { GetProductByIdUseCase } from "../../application/product/interfaces/get-by-id-use-case.js";
import type { GetManyProductsUseCase } from "../../application/product/interfaces/getmany-use-case.js";
import type { UpdateProductUseCase } from "../../application/product/interfaces/update-use-case.js";
import type { DeleteProductUseCase } from "../../application/product/interfaces/delete-use-case.js";
// Category
import type { CreateCategoryUseCase } from "../../application/category/interfaces/create-use-case.js";
import type { GetCategoryByIdUseCase } from "../../application/category/interfaces/get-by-id-use-case.js";
import type { GetManyCategoriesUseCase } from "../../application/category/interfaces/getmany-use-case.js";
import type { UpdateCategoryUseCase } from "../../application/category/interfaces/update-use-case.js";
import type { DeleteCategoryUseCase } from "../../application/category/interfaces/delete-use-case.js";
// User
import type { RegisterUserUseCase } from "../../application/user/interfaces/register-use-case.js";
import type { GetUserByIdUseCase } from "../../application/user/interfaces/get-by-id-use-case.js";
import type { GetManyUsersUseCase } from "../../application/user/interfaces/getmany-use-case.js";
import type { UpdateUserUseCase } from "../../application/user/interfaces/update-use-case.js";
import type { DeleteUserUseCase } from "../../application/user/interfaces/delete-use-case.js";
// auth
import type { LoginUserUseCase } from "../../application/auth/interfaces/login-use-case.js";
import type { RefreshTokenUseCase } from "../../application/auth/interfaces/refresh-token-use-case.js";
// Cart
import type { GetCartByIdUseCase } from "../../application/cart/interfaces/get-by-id-use-case.js";
import type { GetCartByUserIdUseCase } from "../../application/cart/interfaces/get-by-user-id-use-case.js";
import type { ClearCartUseCase } from "../../application/cart/interfaces/clear-use-case.js";
import type { AddCartItemUseCase } from "../../application/cart/interfaces/add-item-use-case.js";
import type { UpdateCartItemUseCase } from "../../application/cart/interfaces/update-item-use-case.js";
import type { RemoveCartItemUseCase } from "../../application/cart/interfaces/remove-item-use-case.js";
// Order
import type { CheckoutUseCase } from "../../application/order/interfaces/checkout-use-case.js";
import type { GetUserOrdersUseCase } from "../../application/order/interfaces/get-user-orders.js";
import type { GetAllOrdersUseCase } from "../../application/order/interfaces/get-all-orders-use-case.js";
import type { ChangeOrderStatusUseCase } from "../../application/order/interfaces/change-status-use-case.js";
// Shipping
import type { CalculateShippingCostUseCase } from "../../application/shipping/interfaces/calculate-cost-use-case.js";
// Shipping Method
import type { AddShippingMethodUseCase } from "../../application/shippingMethod/interfaces/add-method-use-case.js";
import type { DeleteShippingMethodUseCase } from "../../application/shippingMethod/interfaces/delete-method-use-case.js";
import type { GetActiveShippingMethodsUseCase } from "../../application/shippingMethod/interfaces/get-active-methods-use-case.js";
import type { GetShippingMethodByIdUseCase } from "../../application/shippingMethod/interfaces/get-method-by-id-use-case.js";
import type { UpdateShippingMethodUseCase } from "../../application/shippingMethod/interfaces/update-method-use-case.js";
// Payment
import type { CreatePaymentUseCase } from "../../application/payment/interfaces/create-payment-use-case.js";
import type { InitiatePaymentUseCase } from "../../application/payment/interfaces/initiate-payment.js";
import { RefundPaymentUseCase } from "../../application/payment/interfaces/refund-payment-use-case.js";
import { ConfirmPaymentUseCase } from "../../application/payment/interfaces/confirm-payment-use-case.js";
import { GetPaymentStatusUseCase } from "../../application/payment/interfaces/get-payment-status-use-case.js";


export interface UseCases {
    
    // Product
    getProductByIdUseCase: GetProductByIdUseCase;
    getManyProductsUseCase: GetManyProductsUseCase;
    createProductUseCase: CreateProductUseCase;
    updateProductUseCase: UpdateProductUseCase;
    deleteProductUseCase: DeleteProductUseCase;

    // Category
    createCategoryUseCase: CreateCategoryUseCase;
    getManyCategoriesUseCase: GetManyCategoriesUseCase;
    getCategoryByIdUseCase: GetCategoryByIdUseCase;
    updateCategoryUseCase: UpdateCategoryUseCase;
    deleteCategoryUseCase: DeleteCategoryUseCase;

    // User
    getUserByIdUseCase: GetUserByIdUseCase;
    getManyUsersUseCase: GetManyUsersUseCase;
    registerUserUseCase: RegisterUserUseCase;
    updateUserUseCase: UpdateUserUseCase;
    deleteUserUseCase: DeleteUserUseCase;

    // auth
    loginUserUseCase: LoginUserUseCase;
    refreshTokenUseCase: RefreshTokenUseCase;

    // Cart
    getCartByIdUseCase: GetCartByIdUseCase;
    getCartByUserIdUseCase: GetCartByUserIdUseCase;
    clearCartUseCase: ClearCartUseCase;
    addCartItemUseCase: AddCartItemUseCase;
    updateCartItemUseCase: UpdateCartItemUseCase;
    removeCartItemUseCase: RemoveCartItemUseCase;

    // Order
    checkoutUseCase: CheckoutUseCase;
    getUserOrdersUseCase: GetUserOrdersUseCase;
    getAllOrdersUseCase: GetAllOrdersUseCase;
    changeOrderStatusUseCase: ChangeOrderStatusUseCase;

    //Shipping
    calculateShippingCostUseCase: CalculateShippingCostUseCase;

    // Shipping Method
    addShippingMethodUseCase: AddShippingMethodUseCase;
    getShippingMethodByIdUseCase: GetShippingMethodByIdUseCase;
    getActiveShippingMethodsUseCase: GetActiveShippingMethodsUseCase;
    updateShippingMethodUseCase: UpdateShippingMethodUseCase;
    deleteShippingMethodUseCase: DeleteShippingMethodUseCase;

    // Payment
    createPaymentUseCase: CreatePaymentUseCase;
    initiatePaymentUseCase: InitiatePaymentUseCase;
    getPaymentStatusUseCase: GetPaymentStatusUseCase,
    confirmPaymentUseCase: ConfirmPaymentUseCase,
    refundPaymentUseCase: RefundPaymentUseCase;
    
}
