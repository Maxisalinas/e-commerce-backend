import { envs } from '../../config/envs.js';
import { Router } from 'express';
import { ProductController } from './controller.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validateInput } from '../middlewares/inputValidator.js';
import { IdNumParamSchema } from '../helpers/id-validation.js';
import { GetManyProductsSchema } from './dtos/input/getmany-schema.js';
import { CreateProductSchema } from './dtos/input/create-schema.js';
import { UpdateProductSchema } from './dtos/input/update-schema.js';
import { validateAccessToken } from '../middlewares/accessTokenValidator.js';
import { JsonWebToken } from '../../infrastructure/helpers/jsonwebtoken-jwt-generator.js';
import { authorizeRole } from '../middlewares/roleValidator.js';

export class ProductsRoutes {

    static routes(productController: ProductController): Router {

        const router = Router();

        router.get('/:id', 
            validateInput(IdNumParamSchema, 'params'), 
            asyncHandler(productController.getById)
        );

        router.get('/', 
            validateInput(GetManyProductsSchema, 'query'), 
            asyncHandler(productController.getMany)
        );

        router.post('/',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            authorizeRole('ADMIN'),
            validateInput(CreateProductSchema, 'body'), 
            asyncHandler(productController.create)
        );

        router.put('/:id', 
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            authorizeRole('ADMIN'),
            validateInput(IdNumParamSchema, 'params'), 
            validateInput(UpdateProductSchema, 'body'), 
            asyncHandler(productController.update)
        );

        router.delete('/:id', 
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            authorizeRole('ADMIN'),
            validateInput(IdNumParamSchema, 'params'), 
            asyncHandler(productController.delete)
        );
    
        return router;

    }

}

