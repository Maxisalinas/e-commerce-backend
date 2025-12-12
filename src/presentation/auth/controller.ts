import { Request, Response } from 'express';
import { envs } from '../../config/envs.js';
import type { GetUserByIdUseCase } from '../../application/user/interfaces/get-by-id-use-case.js';
import type { LoginUserUseCase } from "../../application/auth/interfaces/login-use-case.js";
import type { RefreshTokenUseCase } from "../../application/auth/interfaces/refresh-token-use-case.js";

import { LoginUserDTO } from "../user/dtos/input/login.js";
import { UserResponseDTO } from "../user/dtos/output/response.js";
import { LoginResponseDTO } from './dtos/output/login-response.js';

export class AuthController {

    constructor(
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly loginUserUseCase: LoginUserUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase,
    ){}

    public login = async ( req: Request, res: Response ) => {
        const loginUserDTO = new LoginUserDTO((req as any).bodyParsed);
        const { user, accessToken: access_token, refreshToken }: LoginResponseDTO = await this.loginUserUseCase.execute(loginUserDTO);
        return res
            .status(200)
            .cookie('refresh_token',
                refreshToken,
                {
                    httpOnly: true,
                    secure: envs.NODE_ENV === 'production',  
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000
                }
            )
            .json({ user, access_token });
    }

    public getCurrentUser = async ( req: Request, res: Response ) => {
        const payload = (req as any).payload;
        const user: UserResponseDTO = await this.getUserByIdUseCase.execute(payload.id);
        return res.status(200).json(user);
    }

    public refreshToken = async ( req: Request, res: Response ) => {
        const payload = (req as any).cookies;
        const user = await this.getUserByIdUseCase.execute(payload.id);
        const newAccessToken = await this.refreshTokenUseCase.execute(payload);
        return res.status(200).json(
                {
                    access_token: newAccessToken,
                    user: user
                }
        );
    }
    
    public logout = async ( req: Request, res: Response ) => {
        res.clearCookie('refresh_token', {
            httpOnly: true, 
            secure: envs.NODE_ENV === 'production',  
            sameSite: 'strict'  
        });
        return res.status(200).json({ message: 'Se ha cerrado sesión correctamente.' });
    }

}


