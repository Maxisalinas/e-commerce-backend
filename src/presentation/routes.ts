import { Router } from 'express';
import { ProductsRoutes } from './product/routes.js';
import { CategoriesRoutes } from './category/routes.js';
import { UsersRoutes } from './user/routes.js';
import { AuthRoutes } from './auth/routes.js';
import { CartRoutes } from './cart/routes.js';
import { Controllers } from '../config/interfaces/controllers.js';
import { OrderRoutes } from './order/routes.js';
import { ShippingRoutes } from './shipping/routes.js';
import { ShippingMethodRoutes } from './shippingMethod/routes.js';

export class AppRoutes {

    static routes(controllers: Controllers): Router {
        const router = Router();
        
        router.use('/products', ProductsRoutes.routes(controllers.productController) );
        router.use('/categories', CategoriesRoutes.routes(controllers.categoryController) );
        router.use('/auth', AuthRoutes.routes(controllers.authController));
        router.use('/users', UsersRoutes.routes(controllers.userController));
        router.use('/cart', CartRoutes.routes(controllers.cartController));
        router.use('/orders', OrderRoutes.routes(controllers.orderController));
        router.use('/shippings', ShippingRoutes.routes(controllers.shippingController));
        router.use('/shipping-methods', ShippingMethodRoutes.routes(controllers.shippingMethodController));


        return router;
    }

}
