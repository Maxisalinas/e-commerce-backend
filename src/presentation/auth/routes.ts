import { Router } from "express";
import { envs } from "../../config/envs.js";
import { AuthController } from "./controller.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { JsonWebToken } from "../../infrastructure/helpers/jsonwebtoken-jwt-generator.js";
import { validateAccessToken } from "../middlewares/accessTokenValidator.js";
import { validateRefreshToken } from "../middlewares/refreshTokenValidator.js";
import { validateInput } from "../middlewares/inputValidator.js";
import { LoginUserSchema } from "../user/dtos/input/login-schema.js";

export class AuthRoutes {

    static routes(authController: AuthController ): Router {

        const router = Router();

        router.post('/login', 
            validateInput(LoginUserSchema, 'body'),
            asyncHandler(authController.login)
        );
        
        router.get('/me', 
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY), 
            asyncHandler(authController.getCurrentUser)
        );
                
        router.post('/refresh-token', 
            validateRefreshToken(JsonWebToken, envs.JWT_SECRET_KEY),
            asyncHandler(authController.refreshToken)
        );

        router.post('/logout', 
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY), 
            asyncHandler(authController.logout)
        );
        
        return router;

    }

}