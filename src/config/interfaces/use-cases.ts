import { LoginUserUseCase } from "../../application/auth/interfaces/login-use-case.js";
import { RefreshTokenUseCase } from "../../application/auth/interfaces/refresh-token-use-case.js";
import { AddCartItemUseCase } from "../../application/cart/interfaces/add-item-use-case.js";
import { ClearCartUseCase } from "../../application/cart/interfaces/clear-use-case.js";
import { GetCartByIdUseCase } from "../../application/cart/interfaces/get-by-id-use-case.js";
import { GetCartByUserIdUseCase } from "../../application/cart/interfaces/get-by-user-id-use-case.js";
import { RemoveCartItemUseCase } from "../../application/cart/interfaces/remove-item-use-case.js";
import { UpdateCartItemUseCase } from "../../application/cart/interfaces/update-item-use-case.js";
import { CreateCategoryUseCase } from "../../application/category/interfaces/create-use-case.js";
import { DeleteCategoryUseCase } from "../../application/category/interfaces/delete-use-case.js";
import { GetCategoryByIdUseCase } from "../../application/category/interfaces/get-by-id-use-case.js";
import { GetManyCategoriesUseCase } from "../../application/category/interfaces/getmany-use-case.js";
import { UpdateCategoryUseCase } from "../../application/category/interfaces/update-use-case.js";
import { CreateProductUseCase } from "../../application/product/interfaces/create-use-case.js";
import { DeleteProductUseCase } from "../../application/product/interfaces/delete-use-case.js";
import { GetProductByIdUseCase } from "../../application/product/interfaces/get-by-id-use-case.js";
import { GetManyProductsUseCase } from "../../application/product/interfaces/getmany-use-case.js";
import { UpdateProductUseCase } from "../../application/product/interfaces/update-use-case.js";
import { GetUserByIdUseCase } from "../../application/user/interfaces/get-by-id-use-case.js";
import { GetManyUsersUseCase } from "../../application/user/interfaces/getmany-use-case.js";
import { RegisterUserUseCase } from "../../application/user/interfaces/register-use-case.js";
import { UpdateUserUseCase } from "../../application/user/interfaces/update-use-case.js";
import { DeleteUserUseCase } from "../../application/user/use-cases/delete.js";

export interface UseCases {
    // Product
    getProductByIdUseCase: GetProductByIdUseCase,
    getManyProductsUseCase: GetManyProductsUseCase,
    createProductUseCase: CreateProductUseCase,
    updateProductUseCase: UpdateProductUseCase,
    deleteProductUseCase: DeleteProductUseCase,

    // Category
    createCategoryUseCase: CreateCategoryUseCase,
    getManyCategoriesUseCase: GetManyCategoriesUseCase,
    getCategoryByIdUseCase: GetCategoryByIdUseCase,
    updateCategoryUseCase: UpdateCategoryUseCase,
    deleteCategoryUseCase: DeleteCategoryUseCase,

    // User
    getUserByIdUseCase: GetUserByIdUseCase,
    getManyUsersUseCase: GetManyUsersUseCase,
    registerUserUseCase: RegisterUserUseCase,
    updateUserUseCase: UpdateUserUseCase,
    deleteUserUseCase: DeleteUserUseCase,

    // auth
    loginUserUseCase: LoginUserUseCase,
    refreshTokenUseCase: RefreshTokenUseCase

    // Cart
    getCartByIdUseCase: GetCartByIdUseCase,
    getCartByUserIdUseCase: GetCartByUserIdUseCase,
    clearCartUseCase: ClearCartUseCase,
    addCartItemUseCase: AddCartItemUseCase,
    updateCartItemUseCase: UpdateCartItemUseCase,
    removeCartItemUseCase: RemoveCartItemUseCase,
}
