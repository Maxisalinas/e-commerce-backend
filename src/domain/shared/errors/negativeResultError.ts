export class NegativeResultError extends Error {
    constructor(value: string) {
        super(`El resultado de la operación financiera no puede ser negativo: ${value}`);
        this.name = 'NegativeResultError';
    }
}
