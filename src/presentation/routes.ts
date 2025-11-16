import { Router } from 'express';

// routes
import { ProductsRoutes } from './product/routes.js';
import { CategoriesRoutes } from './category/routes.js';
import { UsersRoutes } from './user/routes.js';
import { AuthRoutes } from './auth/routes.js';

export class AppRoutes {

  static routes(controllers: any): Router {
    const router = Router();
    

    router.use('/products', ProductsRoutes.routes(controllers.productController) );
    router.use('/categories', CategoriesRoutes.routes(controllers.categoryController) );
    router.use('/auth', AuthRoutes.routes(controllers.authController));
    router.use('/users', UsersRoutes.routes(controllers.userController));
    // router.use('/users', UsersRoutes.routes );  <- Address (RECORDATORIO)
    // router.use('/cart', CartRoutes.routes );
    // router.use('/orders', CartRoutes.routes );

    
    return router;
  }


}
