import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from "../../application/errors/authenticationError.js";
import { JWTGenerator } from '../../application/auth/interfaces/jwt-generator.js';

export function validateRefreshToken(jwt: JWTGenerator, secret: string) {

    return (req: Request, res: Response, next: NextFunction) => {
        const tokenFromCookie = req.cookies?.refresh_token;
        
        if (!tokenFromCookie)
            throw new AuthenticationError('Falta el refresh_token.', 'REFRESH_TOKEN_MISSING');

        const payload = jwt.verifyToken(tokenFromCookie, secret);
        if (!payload)
            throw new AuthenticationError('El refresh_token es inválido o ha expirado.', 'INVALID_REFRESH_TOKEN');

        (req as any).payload = payload;

        next();

    }

}
