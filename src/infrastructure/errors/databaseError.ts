
export class DatabaseError extends Error {
    constructor(
        public message: string, 
        public details?: any
    ){
        super(message);
        this.name = 'DatabaseError';
    }
}

