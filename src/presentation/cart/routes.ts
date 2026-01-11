import { envs } from "../../config/envs.js";
import { Router } from "express";
import { CartController } from "./controller.js";
import { validateInput } from "../middlewares/inputValidator.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { validateAccessToken } from "../middlewares/accessTokenValidator.js";
import { JsonWebToken } from "../../infrastructure/helpers/jsonwebtoken-jwt-generator.js";
import { UUIDParamSchema } from "../helpers/id-validation.js";
import { AddCartItemSchema } from "./dtos/input/add-item-schema.js";
import { UpdateCartItemSchema } from "./dtos/input/update-item-schema.js";

export class CartRoutes {

    static routes(cartController: CartController): Router {

        const router = Router();

        router.get('/:id', 
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            validateInput(UUIDParamSchema, 'params'), 
            asyncHandler(cartController.getById)
        );

        router.get('/me', 
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            asyncHandler(cartController.getByUserId)
        );

        router.delete('/:id', 
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            validateInput(UUIDParamSchema, 'params'), 
            asyncHandler(cartController.clear)
        );

        router.post('/items', 
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            validateInput(AddCartItemSchema, 'body'), 
            asyncHandler(cartController.addItem)
        );

        router.put('/items/:id', 
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            validateInput(UUIDParamSchema, 'params'), 
            validateInput(UpdateCartItemSchema, 'body'), 
            asyncHandler(cartController.updateItem),
        );

        router.delete('/items/:id', 
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            validateInput(UUIDParamSchema, 'params'), 
            asyncHandler(cartController.removeItem)
        );

        return router;
    }

}

