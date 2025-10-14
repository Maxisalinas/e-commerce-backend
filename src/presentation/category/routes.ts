

import { Router } from 'express';
import { CategoryController } from './controller.js';
import { asyncHandler } from '../middlewares/asyncHandler.js';
import { validateInput } from '../middlewares/inputValidator.js';
import { IdParamSchema } from '../helpers/id-validation.js';
import { GetManyCategoriesSchema } from './dtos/input/getmany.js';
import { CreateCategorySchema } from './dtos/input/create.js';
import { UpdateCategorySchema } from './dtos/input/update.js';

export class CategoriesRoutes {

  static routes(categoryController: CategoryController): Router {
    
    const router = Router();

    router.get('/:id', validateInput(IdParamSchema, 'params'), asyncHandler(categoryController.getById));
    
    router.get('/', validateInput(GetManyCategoriesSchema, 'query'), asyncHandler(categoryController.getMany));

    router.post('/', validateInput(CreateCategorySchema, 'body'), asyncHandler(categoryController.create));

    router.put('/:id', validateInput(IdParamSchema, 'params'), validateInput(UpdateCategorySchema, 'body'), asyncHandler(categoryController.update));

    router.delete('/:id', validateInput(IdParamSchema, 'params'), asyncHandler(categoryController.delete));

    return router;

  }


}

