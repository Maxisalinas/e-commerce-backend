export class AuthorizationError extends Error {

    code?: string;
    details?: any;

    constructor(message: string, code: string, details?: any) {
        super(message);
        this.name = 'AuthorizationError';
        this.code = code;    
        this.details = details;  
    }
    
}
