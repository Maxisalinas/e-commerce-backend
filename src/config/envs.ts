import env from 'env-var';
import 'dotenv/config';

export const envs = {

    PORT: env.get('PORT').required().asPortNumber(),
    DATABASE_URL: env.get('DATABASE_URL').required().asString(),
    NODE_ENV: env.get('NODE_ENV').required().asString(),
    JWT_SECRET_KEY: env.get('JWT_SECRET_KEY').required().asString()

}