import { LoginUserDTOProps } from "./login-schema.js";

export class LoginUserDTO {

    public readonly email!: string;
    public readonly password!: string;

    constructor(input: LoginUserDTOProps) {
        Object.assign(this, input);
    }

}

