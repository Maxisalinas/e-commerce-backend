
export class DatabaseValidationError extends Error {
    constructor(
        public message: string, 
        public details?: any
    ){
        super(message);
        this.name = 'ValidationError';
    }
}