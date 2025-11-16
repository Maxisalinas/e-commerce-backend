import { JWTPayload } from "./payload.js";

export interface JWTGenerator {
    generateToken( payload: JWTPayload, secret: string, options?: object ): string;
    verifyToken( token: string, secret: string ): JWTPayload | null;
}