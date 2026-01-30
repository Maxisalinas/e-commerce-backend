import { Decimal } from "decimal.js";
import { CurrencyMismatchError } from "../errors/currencyMismatchError.js";
import { NegativeMoneyError } from "../errors/negativeMoneyError.js";
import { NegativeResultError } from "../errors/negativeResultError.js";

export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    ARS = 'ARS',
}

export class Money {

    private constructor(
        public readonly value: Decimal,
        public readonly currency: Currency,
    ) {}

    public static of(value: number, currency: Currency): Money {
        if (value < 0) throw new NegativeMoneyError(value);  // Usar el error personalizado
        return new Money(new Decimal(value), currency);
    }

    public add(other: Money): Money {
        this.ensureSameCurrency(other);
        return new Money(this.value.plus(other.value), this.currency);
    }

    public subtract(other: Money): Money {
        this.ensureSameCurrency(other);
        const result = this.value.minus(other.value);
        if (result.lessThan(0)) throw new NegativeResultError(result.toString());  // Usar el error personalizado
        return new Money(result, this.currency);
    }

    public multiply(factor: number): Money {
        if (factor < 0) throw new Error('Factor cannot be negative');
        return new Money(this.value.times(factor), this.currency);
    }

    public equals(other: Money): boolean {
        return this.value.equals(other.value) && this.currency === other.currency;
    }

    private ensureSameCurrency(other: Money) {
        if (this.currency !== other.currency) {
            throw new CurrencyMismatchError(this.currency, other.currency);
        }
    }

    public toString(): string {
        return `${this.value.toFixed(2)}`;
    }

    public toNumber(): number {
        return Number(this.value.toFixed(2));
    }


}
