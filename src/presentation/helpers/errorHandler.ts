import { ZodError } from 'zod';
import { DatabaseValidationError } from '../../infrastructure/errors/databaseValidationError.js';
import { DatabaseError } from '../../infrastructure/errors/databaseError.js';
import { NotFoundError } from '../../infrastructure/errors/notFoundError.js';

export interface ErrorResponse {
    status: number;
    message: string;
    details?: any;
}

export function errorHandler(error: unknown): ErrorResponse {

    if (error instanceof ZodError) {
        return {
            status: 400,
            message: 'Error de validación',
            details: error.issues[0].message,
        };
    }

    if (error instanceof DatabaseValidationError) {
        return {
            status: 400,
            message: error.message,
            details: error.details,
        };
    }

    if (error instanceof DatabaseError) {
        return {
            status: 500,
            message: error.message,
        };
    }

    if (error instanceof NotFoundError) {
        return {
            status: 404,
            message: error.message,
        };
    }

    if (error instanceof Error) {
        console.error('Error inesperado:', error.message);

        return {
            status: 500,
            message: 'Ocurrió un error interno.',
            details: error.message
        };
    }

    console.error('Error no controlado (no es instancia de Error):', error);
    return {
        status: 500,
        message: 'Error desconocido',
    };
}
