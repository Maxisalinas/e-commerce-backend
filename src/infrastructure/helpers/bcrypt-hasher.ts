import bcrypt from 'bcryptjs';
import { PasswordHasher } from '../../application/user/interfaces/password-hasher.js';

export class BcryptHasher implements PasswordHasher {
    public async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}