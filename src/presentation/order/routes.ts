import { Router } from "express";
import { envs } from "../../config/envs.js";
import { OrderController } from "./controller.js";
import { validateAccessToken } from "../middlewares/accessTokenValidator.js";
import { JsonWebToken } from "../../infrastructure/helpers/jsonwebtoken-jwt-generator.js";
import { validateInput } from "../middlewares/inputValidator.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { CheckoutSchema } from "./dtos/input/checkout-schema.js";
import { authorizeRole } from "../middlewares/roleValidator.js";

export class OrderRoutes {

    static routes(orderController: OrderController): Router {

        const router = Router();

        router.post('/checkout',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            validateInput(CheckoutSchema, 'body'), 
            asyncHandler(orderController.checkout)
        );

        router.get('/me',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            asyncHandler(orderController.getUserOrders)
        );

        router.get('/',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            authorizeRole('ADMIN'),
            asyncHandler(orderController.getAllOrders)
        );

        router.post('/:id/changestatus',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            authorizeRole('ADMIN'),
            asyncHandler(orderController.changeStatus)
        );

        return router;
    }

}

