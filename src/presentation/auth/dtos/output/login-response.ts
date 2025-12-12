import { UserResponseDTO } from "../../../user/dtos/output/response.js";

export class LoginResponseDTO {

    public readonly user: UserResponseDTO;
    public readonly accessToken: string;
    public readonly refreshToken: string;

    constructor(user: UserResponseDTO, accessToken: string, refreshToken: string) {
        this.user = user;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

}