import { ZodError } from 'zod';
import { DatabaseValidationError } from '../../infrastructure/errors/databaseValidationError.js';
import { DatabaseError } from '../../infrastructure/errors/databaseError.js';
import { NotFoundError } from '../../application/errors/notFoundError.js';
import { AuthenticationError } from '../../application/auth/errors/authenticationError.js';
import { AuthorizationError } from '../../application/auth/errors/authorizationError.js';
import { InvalidOrderStatusError } from '../../domain/order/errors/invalidOrderStatusError .js';
import { OrderAlreadyCancelledError } from '../../domain/order/errors/orderAlreadyCancelledError.js';


export interface ErrorResponse {
    status: number;
    message: string;
    code?: string;
    details?: any;
}

export function errorHandler(error: unknown): ErrorResponse {

    if (error instanceof ZodError) {
        return {
            status: 400,
            message: `Error de validación en la propiedad '${error.issues[0].path.join('.')}'.`,
            details: error.issues[0].message,
        }
    }

    if (error instanceof DatabaseValidationError) {
        return {
            status: 400,
            message: error.message,
            details: error.details,
        }
    }

    if (error instanceof DatabaseError) {
        return {
            status: 500,
            message: error.message,
        }
    }

    if (error instanceof NotFoundError) {
        return {
            status: 404,
            message: error.message,
        }
    }

    if (error instanceof AuthenticationError) {
        return {
            status: 401,
            message: error.message,
            code: error.code,
            details: error.details
        }
    }

        if (error instanceof AuthorizationError) {
        return {
            status: 403,
            message: error.message,
            code: error.code,
            details: error.details
        }
    }



    if (error instanceof InvalidOrderStatusError) {
        return {
            status: 400, 
            message: error.message,
            details: error.details,  
        };
    }


    if (error instanceof OrderAlreadyCancelledError) {
        return {
            status: 400, 
            message: error.message,
            details: error.details,
        };
    }


    if (error instanceof Error) {
        console.error('Error inesperado:', error.message);

        return {
            status: 500,
            message: 'Ocurrió un error interno.',
            details: error.message
        }
    }

    console.error('Error no controlado (no es instancia de Error):', error);
    return {
        status: 500,
        message: 'Error desconocido',
    }

}
