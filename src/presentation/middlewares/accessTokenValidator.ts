import { Request, Response, NextFunction } from 'express';
import type { JWTGenerator } from '../../application/auth/interfaces/jwt-generator.js';
import { AuthenticationError } from '../../application/auth/errors/authenticationError.js';


export function validateAccessToken(jwt: JWTGenerator, secret: string) {

    return (req: Request, res: Response, next: NextFunction) => {

        const authHeader = req.headers['authorization'];
        
        if (authHeader && !authHeader.startsWith('Bearer ')) throw new AuthenticationError('El encabezado Authorization debe tener el formato "Bearer <token>".', 'INVALID_HEADER_FORMAT');
       
        const tokenFromHeader = authHeader?.split(' ')[1]; 
        const tokenFromCookie = req.cookies?.refresh_token;
        if (!tokenFromHeader && !tokenFromCookie) throw new AuthenticationError('Falta el token de autenticación (access_token o refresh_token).', 'TOKEN_MISSING');

        if (tokenFromHeader) {   
                const payload = jwt.verifyToken(tokenFromHeader, secret);
                if (!payload) throw new AuthenticationError('El access_token es inválido.', 'INVALID_ACCESS_TOKEN');
                
                (req as any).payload = payload;
                return next(); 
        }

        if (tokenFromCookie) throw new AuthenticationError('El access_token ha expirado. Usa el refresh_token para obtener uno nuevo.', 'TOKEN_EXPIRED');
        
    }
    
}
