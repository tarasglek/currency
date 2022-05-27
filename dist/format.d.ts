import { CurrencyAlphabeticCode } from './currency';
export declare type Amount = string | bigint | -0;
export interface Money {
    amount: Amount;
    currency: CurrencyAlphabeticCode | string;
}
export interface CurrencyFormatOptions extends Pick<Intl.NumberFormatOptions, 'useGrouping'> {
    currencyDisplay?: 'code' | 'symbol' | 'name';
    useCurrency?: boolean;
    useDecimal?: boolean;
    minorUnitDigits?: number;
}
export declare const defaultCurrencyFormatOptions: CurrencyFormatOptions;
export declare function format({ amount, currency }: Money, options?: CurrencyFormatOptions, locales?: string | string[]): string;
