import {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientInitializationError,
    PrismaClientValidationError
} from '@prisma/client/runtime/library.js';

export {
    PrismaClientKnownRequestError,
    PrismaClientUnknownRequestError,
    PrismaClientInitializationError,
    PrismaClientValidationError
}

import { DatabaseError } from '../errors/databaseError.js';
import { DatabaseValidationError } from '../errors/databaseValidationError.js';

export function handlePrismaError(error: unknown): Error {

  if (error instanceof Error) {
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2003') { // foreign key violation
                return new DatabaseValidationError('Hubo un error de referencia: violación de clave foránea. Verifica que los datos relacionados existan.');
            }
            console.error('Error en la base de datos:', error.message);
            return new DatabaseError('Error en la operación. Verifica los datos ingresados.');   
        } else if (error instanceof PrismaClientUnknownRequestError) {
            console.error('Error desconocido de Prisma:', error.message);
            return new DatabaseError('Error al procesar la solicitud.');
        } else if (error instanceof PrismaClientInitializationError) {
            console.error('Error en la inicialización de Prisma:', error.message);
            return new DatabaseError('No se pudo conectar con la base de datos.');
        } else if (error instanceof PrismaClientValidationError) {
            console.error('Error de validación de Prisma:', error.message);
            return new DatabaseValidationError('Los datos proporcionados son inválidos.');
        } else {
            console.error('Error inesperado:', error.message);
            return new DatabaseError('Ha ocurrido un error inesperado');
        }

    } else {
        console.error('Error desconocido:', error);
        return new Error('Ha ocurrido un error desconocido.');
    }
}
