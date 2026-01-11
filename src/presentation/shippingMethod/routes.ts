import { Router } from "express";
import { envs } from "../../config/envs.js";
import { ShippingMethodController } from "./controller.js";
import { JsonWebToken } from "../../infrastructure/helpers/jsonwebtoken-jwt-generator.js";
import { validateAccessToken } from "../middlewares/accessTokenValidator.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { validateInput } from "../middlewares/inputValidator.js";
import { authorizeRole } from "../middlewares/roleValidator.js";
import { UUIDParamSchema } from "../helpers/id-validation.js";
import { UpdateShippingMethodSchema } from "./dtos/input/update-method-schema.js";
import { AddShippingMethodSchema } from "./dtos/input/add-method-schema.js";

export class ShippingMethodRoutes {

    static routes(shippingMethodController: ShippingMethodController): Router {

        const router = Router();

        router.post('/',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            authorizeRole('ADMIN'),
            validateInput(AddShippingMethodSchema, 'body'), 
            asyncHandler(shippingMethodController.addMethod)
        );

        router.get('/:id',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            validateInput(UUIDParamSchema, 'params'), 
            asyncHandler(shippingMethodController.getMethodById)
        );

        router.get('/active',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            asyncHandler(shippingMethodController.getActiveMethods)
        );

        router.put('/:id',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            authorizeRole('ADMIN'),
            validateInput(UUIDParamSchema, 'params'), 
            validateInput(UpdateShippingMethodSchema, 'body'), 
            asyncHandler(shippingMethodController.updateMethod)
        );

        router.delete('/:id',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            authorizeRole('ADMIN'),
            validateInput(UUIDParamSchema, 'params'), 
            asyncHandler(shippingMethodController.deleteMethod)
        );


        return router;
    }

}

