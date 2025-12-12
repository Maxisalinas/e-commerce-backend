export class AuthenticationError extends Error {
    code?: string;
    details?: any;

    constructor(message: string, code?: string, details?: any) {
        super(message);
        this.name = 'AuthenticationError';
        this.code = code;    
        this.details = details;  
    }
}
