import { envs } from "../../../config/envs.js";
import type { JWTGenerator } from "../interfaces/jwt-generator.js";
import type { JWTPayload } from "../interfaces/payload.js";
import type { RefreshTokenUseCase } from "../interfaces/refresh-token-use-case.js";

export class RefreshToken implements RefreshTokenUseCase {

    constructor(
        private readonly jwt: JWTGenerator
    ) {}

    public async execute(payload: JWTPayload ): Promise<string> {
        const accessToken = this.jwt.generateToken( 
            payload,
            envs.JWT_SECRET_KEY, 
            { expiresIn: '15m' }
        )
        return accessToken;
    }

}