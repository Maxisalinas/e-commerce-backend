import { UserResponseDTO } from "../../../user/dtos/output/response.js";

export interface LoginResponseDTO {
    user: UserResponseDTO,
    accessToken: string,
    refreshToken: string
}