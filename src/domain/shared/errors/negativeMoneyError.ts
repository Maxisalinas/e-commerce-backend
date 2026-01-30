export class NegativeMoneyError extends Error {

    constructor(value: number) {
        super(`No se puede crear un valor negativo para Money: ${value}`);
        this.name = 'NegativeMoneyError';
    }
    
}
