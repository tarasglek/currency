import { Currency, CurrencyAlphabeticCode, CurrencyNumericCode } from './currencies';
export { Currency, CurrencyAlphabeticCode, CurrencyNumericCode, CurrencyName } from './currencies';
export declare function allCurrencies(): Currency[];
export declare function getCurrency(code: CurrencyAlphabeticCode | CurrencyNumericCode): Currency;
export declare function getMinorUnitDigits(currency: CurrencyAlphabeticCode): number;
export declare function getSymbol(currency: CurrencyAlphabeticCode, locales?: string | string[]): string | undefined;
