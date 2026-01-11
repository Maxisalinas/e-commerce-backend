import { PrismaClientInitializationError, 
    PrismaClientKnownRequestError, 
    PrismaClientUnknownRequestError,
     PrismaClientValidationError 
} from "./prismaErrorsHandler.js";

export function isPrismaError(error: unknown): boolean {
    return (
        error instanceof PrismaClientKnownRequestError ||
        error instanceof PrismaClientUnknownRequestError ||
        error instanceof PrismaClientInitializationError ||
        error instanceof PrismaClientValidationError
    );
}

