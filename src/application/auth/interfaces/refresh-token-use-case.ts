import type { JWTPayload } from "./payload.js";

export interface RefreshTokenUseCase {
    execute( payload: JWTPayload ): Promise<string>,
}