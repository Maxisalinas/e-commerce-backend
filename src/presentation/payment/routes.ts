import { Router } from "express";
import { envs } from "../../config/envs.js";
import { PaymentController } from "./controller.js";
import { CreatePaymentSchema } from "./dtos/input/create-schema.js";
import { InitiatePaymentSchema } from "./dtos/input/initiate-schema.js";
import { validateAccessToken } from "../middlewares/accessTokenValidator.js";
import { JsonWebToken } from "../../infrastructure/helpers/jsonwebtoken-jwt-generator.js";
import { validateInput } from "../middlewares/inputValidator.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { authorizeRole } from "../middlewares/roleValidator.js";
import { UUIDParamSchema } from "../helpers/id-validation.js";

export class PaymentRoutes {

    static routes(paymentController: PaymentController): Router {

        const router = Router();
        
        router.post('/',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            validateInput(CreatePaymentSchema, 'body'), 
            asyncHandler(paymentController.createPayment)
        );
        
        router.post('/:id/initiate',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            validateInput(UUIDParamSchema, 'params'), 
            validateInput(InitiatePaymentSchema, 'body'), 
            asyncHandler(paymentController.initiatePayment)
        );
        
        router.get('/:id/status',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            validateInput(UUIDParamSchema, 'params'), 
            asyncHandler(paymentController.getPaymentStatus)
        );
        
        router.post('/:id/refund',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            authorizeRole('ADMIN'),
            validateInput(UUIDParamSchema, 'params'), 
            asyncHandler(paymentController.refundPayment)
        );

        router.post('/:id/internal-confirm',
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            authorizeRole('ADMIN'),
            validateInput(UUIDParamSchema, 'params'), 
            asyncHandler(paymentController.confirmInternalPayment)
        );
        
        // WEBHOOK
        router.post('/webhook-confirm',
            // Autenticar la solicitud
            asyncHandler(paymentController.confirmPaymentFromProvider)
        );

        return router;
    }

}

