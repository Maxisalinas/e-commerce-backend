import { Role } from "../../../../domain/user/entity.js";
import { UpdateUserDTOProps } from "./update-schema.js";

export class UpdateUserDTO {

    public readonly name?: string;
    public readonly password?: string; // TODO: Crear DTO especifico para ChangePasswordUseCase
    public readonly role?: Role; // TODO: Crear DTO especifico para ChangeRoleUseCase

    constructor(input: UpdateUserDTOProps) {
        Object.assign(this, input);
    }

}

