import { GetManyUsersDTOProps } from "./getmany-schema.js";

export class GetManyUsersDTO {

    public readonly page?: number;
    public readonly limit?: number;
    public readonly search?: string;
    public readonly role?: string;

    constructor(input: GetManyUsersDTOProps) {
        Object.assign(this, input);
    }

}

