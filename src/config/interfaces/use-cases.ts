import { LoginUserUseCase } from "../../application/auth/interfaces/login-use-case.js";
import { RefreshTokenUseCase } from "../../application/auth/interfaces/refresh-token-use-case.js";
import { CreateCategoryUseCase } from "../../application/category/interfaces/create-use-case.js";
import { DeleteCategoryUseCase } from "../../application/category/interfaces/delete-use-case.js";
import { GetCategoryByIdUseCase } from "../../application/category/interfaces/get-by-id-use-case.js";
import { GetManyCategoriesUseCase } from "../../application/category/interfaces/getmany-use-case.js";
import { UpdateCategoryUseCase } from "../../application/category/interfaces/update-use-case.js";
import { CreateProductUseCase } from "../../application/product/use-cases/create.js";
import { DeleteProductUseCase } from "../../application/product/use-cases/delete.js";
import { GetProductByIdUseCase } from "../../application/product/use-cases/get-by-id.js";
import { GetManyProductsUseCase } from "../../application/product/use-cases/getmany.js";
import { UpdateProductUseCase } from "../../application/product/use-cases/update.js";
import { GetUserByIdUseCase } from "../../application/user/interfaces/get-by-id-use-case.js";
import { GetManyUsersUseCase } from "../../application/user/interfaces/getmany-use-case.js";
import { RegisterUserUseCase } from "../../application/user/interfaces/register-use-case.js";
import { UpdateUserUseCase } from "../../application/user/interfaces/update-use-case.js";
import { DeleteUserUseCase } from "../../application/user/use-cases/delete.js";

export interface UseCases {
    // products
    getProductByIdUseCase: GetProductByIdUseCase,
    getManyProductsUseCase: GetManyProductsUseCase,
    createProductUseCase: CreateProductUseCase,
    updateProductUseCase: UpdateProductUseCase,
    deleteProductUseCase: DeleteProductUseCase,
    // categories
    createCategoryUseCase: CreateCategoryUseCase,
    getManyCategoriesUseCase: GetManyCategoriesUseCase,
    getCategoryByIdUseCase: GetCategoryByIdUseCase,
    updateCategoryUseCase: UpdateCategoryUseCase,
    deleteCategoryUseCase: DeleteCategoryUseCase,
    // user
    getUserByIdUseCase: GetUserByIdUseCase,
    getManyUsersUseCase: GetManyUsersUseCase,
    registerUserUseCase: RegisterUserUseCase,
    updateUserUseCase: UpdateUserUseCase,
    deleteUserUseCase: DeleteUserUseCase,
    // auth
    loginUserUseCase: LoginUserUseCase,
    refreshTokenUseCase: RefreshTokenUseCase
}
