import { Currency } from "../value-objects/money.js";

export class CurrencyMismatchError extends Error {

    constructor(currency1: Currency, currency2: Currency) {
        super(`Las monedas no coinciden: ${currency1} vs ${currency2}`);
        this.name = 'CurrencyMismatchError';
    }
    
}
