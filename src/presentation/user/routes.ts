import { Router } from "express";
import { envs } from "../../config/envs.js";
import { validateInput } from "../middlewares/inputValidator.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { UserController } from "./controller.js";
import { UUIDParamSchema } from "../helpers/id-validation.js";
import { RegisterUserSchema } from "./dtos/input/register-schema.js";
import { GetManyUsersSchema } from "./dtos/input/getmany-schema.js";
import { UpdateUserSchema } from "./dtos/input/update-schema.js";
import { authorizeRole } from "../middlewares/roleValidator.js";
import { JsonWebToken } from "../../infrastructure/helpers/jsonwebtoken-jwt-generator.js";
import { validateAccessToken } from "../middlewares/accessTokenValidator.js";

export class UsersRoutes {

  static routes(userController: UserController): Router {

        const router = Router();

        router.get('/:id', 
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            authorizeRole('ADMIN'),
            validateInput(UUIDParamSchema, 'params'), 
            asyncHandler(userController.getById)
        );
        // TODO: route /me, para que el usuario pueda obtener sus propios datos.

        router.get('/', 
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            validateInput(GetManyUsersSchema, 'query'), 
            authorizeRole('ADMIN'),
            asyncHandler(userController.getMany)
        );

        router.post('/register', 
            validateInput(RegisterUserSchema, 'body'), 
            asyncHandler(userController.register)
        );

        router.put('/:id', 
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            authorizeRole('ADMIN'),
            validateInput(UUIDParamSchema, 'params'), 
            validateInput(UpdateUserSchema, 'body'), 
            asyncHandler(userController.update)
        );
        // TODO: route /me, para que el usuario pueda modificar sus propios datos.


        router.delete('/:id', 
            validateAccessToken(JsonWebToken, envs.JWT_SECRET_KEY),
            authorizeRole('ADMIN'),
            validateInput(UUIDParamSchema, 'params'), 
            asyncHandler(userController.delete)
        );
        // TODO: route /me, para que el usuario pueda borrar su propio registro.


        return router;

    }

}

