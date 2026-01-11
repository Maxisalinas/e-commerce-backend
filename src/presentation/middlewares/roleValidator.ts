import { Request, Response, NextFunction } from 'express';
import { AuthorizationError } from '../../application/auth/errors/authorizationError.js';

export function authorizeRole( ...allowedRoles: string[] ) {

    return (req: Request, res: Response, next: NextFunction) => {
        const payload = (req as any).payload;

        if (!allowedRoles.includes(payload.role)) {
            throw new AuthorizationError(
                'No tiene permisos para realizar esta operación.',
                'NOT_AUTHORIZED',
                { requiredRoles: allowedRoles, actualRole: payload.role } 
            );
        }

        next();
    }
    
}
