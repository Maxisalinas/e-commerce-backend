import { RegisterUserDTOProps } from "./register-schema.js";

export class RegisterUserDTO {

    public readonly name!: string;
    public readonly email!: string;
    public password!: string;

    constructor(input: RegisterUserDTOProps) {
        Object.assign(this, input);
    }

}

