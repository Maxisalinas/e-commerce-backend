import jwt from 'jsonwebtoken';
import { JWTPayload } from '../../application/auth/interfaces/payload.js';
import { AuthenticationError } from '../../application/auth/errors/authenticationError.js';

export const JsonWebToken = {
    
    generateToken(payload: JWTPayload, secret: string, options?: jwt.SignOptions): string {
        return jwt.sign(payload, secret, options);
    },

    verifyToken(token: string, secret: string): JWTPayload | null {
        try {
            const payload = jwt.verify(token, secret);
            if (typeof payload === 'string') throw new AuthenticationError('Tipo de payload inesperado.');
            if (!payload.id || !payload.role) throw new AuthenticationError('El payload no cumple el formato deseado.');
            return payload as JWTPayload;

        } catch (error) {      
            return null;
        }
    }

}
