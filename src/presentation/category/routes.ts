

import { Router } from 'express';
import { envs } from '../../config/envs.js';
import { CategoryController } from './controller.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validateInput } from '../middlewares/inputValidator.js';
import { IdParamSchema } from '../helpers/id-validation.js';
import { GetManyCategoriesSchema } from './dtos/input/getmany-schema.js';
import { CreateCategorySchema } from './dtos/input/create-schema.js';
import { UpdateCategorySchema } from './dtos/input/update-schema.js';
import { JsonWebToken } from '../../infrastructure/helpers/jsonwebtoken-jwt-generator.js';
import { validateAccessToken } from '../middlewares/accessTokenValidator.js';
import { authorizeRole } from '../middlewares/roleValidator.js';

export class CategoriesRoutes {

  static routes(categoryController: CategoryController): Router {
    
    const router = Router();

    router.get('/:id', 
        validateInput(IdParamSchema, 'params'), 
        asyncHandler(categoryController.getById)
    );

    router.get('/', 
        validateInput(GetManyCategoriesSchema, 'query'), 
        asyncHandler(categoryController.getMany)
    );

    router.post('/',
        validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY), 
        authorizeRole('ADMIN'),  
        validateInput(CreateCategorySchema, 'body'), 
        asyncHandler(categoryController.create)
    );

    router.put('/:id',
        validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY), 
        authorizeRole('ADMIN'),
        validateInput(IdParamSchema, 'params'), 
        validateInput(UpdateCategorySchema, 'body'), 
        asyncHandler(categoryController.update)
    );

    router.delete('/:id',
        validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY), 
        authorizeRole('ADMIN'),
        validateInput(IdParamSchema, 'params'), 
        asyncHandler(categoryController.delete)
    );

    return router;

  }


}

