import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../helpers/errorHandler.js';
import { ErrorResponse } from '../helpers/errorHandler.js';
import { isPrismaError } from '../../infrastructure/helpers/isPrismaError.js';
import { handlePrismaError } from '../../infrastructure/helpers/prismaErrorsHandler.js';


export const errorsHandler = (err: unknown, _req: Request, res: Response<ErrorResponse>, _next: NextFunction) => {

    let error = err;
    if (isPrismaError(err)) {
        error = handlePrismaError(err);
    }

    const handledError = errorHandler(error);
    res.status(handledError.status).json(handledError);
}

