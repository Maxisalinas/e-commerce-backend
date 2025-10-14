import { Router } from 'express';
import { ProductsRoutes } from './product/routes.js';
import { CategoriesRoutes } from './category/routes.js';
import { ProductController } from './product/controller.js';
import { CategoryController } from './category/controller.js';

export class AppRoutes {

  static routes(productController: ProductController, categoryController: CategoryController): Router {
    const router = Router();
    
    // router.use('/auth', AuthRoutes.routes );
    // router.use('/users', UsersRoutes.routes );
    // router.use('/users', AddressRoutes.routes ); // <- Address
    router.use('/products', ProductsRoutes.routes(productController) );
    router.use('/categories', CategoriesRoutes.routes(categoryController) );
    // router.use('/cart', CartRoutes.routes );
    // router.use('/orders', CartRoutes.routes );

    
    return router;
  }


}
