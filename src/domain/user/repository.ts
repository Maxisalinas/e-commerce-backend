import { UserEntity } from "./entity.js";
import type { UserFilter } from "../../application/user/interfaces/user-filter.js";

export abstract class UserRepository {

    abstract getById( id: string ): Promise<UserEntity>;
    abstract getByEmail( email: string ): Promise<UserEntity | null>;
    abstract getMany( filters: UserFilter ): Promise<UserEntity[]>;
    abstract register( user: UserEntity ): Promise<UserEntity>;
    abstract update( user: UserEntity ): Promise<UserEntity>;
    abstract delete( id: string ): Promise<void>;

}