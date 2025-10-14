import { envs } from "./config/envs.js";
import { Server } from "./presentation/server.js";
import { AppRoutes } from "./presentation/routes.js";
// Repos
import { ProductRepositoryImpl } from "./infrastructure/product/repository.impl.js";
import { CategoryRepositoryImpl } from "./infrastructure/category/repository.impl.js";
// Controladores
import { ProductController } from "./presentation/product/controller.js";
import { CategoryController } from "./presentation/category/controller.js";
// Casos de uso
import { GetProductById } from "./application/product/use-cases/get-by-id.js";
import { GetManyProducts } from "./application/product/use-cases/getmany.js";
import { CreateProduct } from "./application/product/use-cases/create.js";
import { UpdateProduct } from "./application/product/use-cases/update.js";
import { GetCategoryById } from "./application/category/use-cases/get-by-id.js";
import { GetManyCategories } from "./application/category/use-cases/getmany.js";
import { CreateCategory } from "./application/category/use-cases/create.js";
import { UpdateCategory } from "./application/category/use-cases/update.js";
import { DeleteProduct } from "./application/product/use-cases/delete.js";
import { DeleteCategory } from "./application/category/use-cases/delete.js";


async function main() {

    // Repos
    const productRepository = new ProductRepositoryImpl();
    const categoryRepository = new CategoryRepositoryImpl();

    // Casos de uso
    const getProductByIdUseCase = new GetProductById(productRepository);
    const getManyProductsUseCase = new GetManyProducts(productRepository);
    const createProductUseCase = new CreateProduct(productRepository);
    const updateProductUseCase = new UpdateProduct(productRepository);
    const deleteProductUseCase = new DeleteProduct(productRepository);
    const createCategoryUseCase = new CreateCategory(categoryRepository);
    const getManyCategoriesUseCase = new GetManyCategories(categoryRepository);
    const getCategoryByIdUseCase = new GetCategoryById(categoryRepository);
    const updateCategoryUseCase = new UpdateCategory(categoryRepository);
    const deleteCategoryUseCase = new DeleteCategory(categoryRepository);
    

    // Controladores
    const productController = new ProductController(
        getProductByIdUseCase,
        getManyProductsUseCase,
        createProductUseCase,
        updateProductUseCase,
        deleteProductUseCase
    );
    const categoryController = new CategoryController(
        getCategoryByIdUseCase,
        getManyCategoriesUseCase,
        createCategoryUseCase,
        updateCategoryUseCase,
        deleteCategoryUseCase
    );

    // Servidor
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes(productController, categoryController),
    });
    
    server.start();
}   

main().catch((error) => {
    console.error('Error al iniciar la app:', error);
    process.exit(1);
});