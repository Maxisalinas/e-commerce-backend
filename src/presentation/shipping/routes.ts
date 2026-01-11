import { Router } from "express";
import { envs } from "../../config/envs.js";
import { ShippingController } from "./controller.js";
import { JsonWebToken } from "../../infrastructure/helpers/jsonwebtoken-jwt-generator.js";
import { validateAccessToken } from "../middlewares/accessTokenValidator.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { validateInput } from "../middlewares/inputValidator.js";
import { CalculateShippingCostSchema } from "./dtos/input/calculate-cost-schema.js";

export class ShippingRoutes {

    static routes(shippingController: ShippingController): Router {

        const router = Router();

        router.post('/quote',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            validateInput(CalculateShippingCostSchema, 'body'), 
            asyncHandler(shippingController.calculateCost)
        );

        return router;
    }

}

