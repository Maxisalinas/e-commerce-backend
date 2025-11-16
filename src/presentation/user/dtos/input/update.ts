import { Role } from "../../../../domain/user/entity.js";
import { UpdateUserDTOProps } from "./update-schema.js";

export class UpdateUserDTO {

    public readonly name?: string;
    public readonly password?: string;
    public readonly role?: Role;

    constructor(input: UpdateUserDTOProps) {
        Object.assign(this, input);
    }

}

