import { Router } from 'express';
import { ProductController } from './controller.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validateInput } from '../middlewares/inputValidator.js';
import { GetManyProductsSchema } from './dtos/input/getmany.js';
import { CreateProductSchema } from './dtos/input/create.js';
import { IdParamSchema } from '../helpers/id-validation.js';
import { UpdateProductSchema } from './dtos/input/update.js';
// import { authMiddleware, adminMiddleware } from '../middlewares/auth'; // Ejemplo de middlewares

export class ProductsRoutes {

  static routes(productController: ProductController): Router {
    
    const router = Router();

    router.get('/:id', validateInput(IdParamSchema, 'params'), asyncHandler(productController.getById));

    router.get('/', validateInput(GetManyProductsSchema, 'query'), asyncHandler(productController.getMany));

    router.post('/', validateInput(CreateProductSchema, 'body'), asyncHandler(productController.create));
    // router.post('/', authMiddleware, adminMiddleware, productController.create);

    router.put('/:id', validateInput(IdParamSchema, 'params'), validateInput(UpdateProductSchema, 'body'), asyncHandler(productController.update));

    router.delete('/:id', validateInput(IdParamSchema, 'params'), asyncHandler(productController.delete));
    // router.delete('/:id', authMiddleware, adminMiddleware, productController.delete); -> Ejemplo con middlewares.
    
    return router;

  }

}

