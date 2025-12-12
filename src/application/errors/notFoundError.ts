export class NotFoundError extends Error {
    constructor(
        public message: string, 
        public details?: any
    ){
        super(message);
        this.name = 'NotFoundError';
    }
}