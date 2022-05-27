import { Country, CountryAlpha2, CountryAlpha3, CountryNumeric } from './countries';
import type { CurrencyAlphabeticCode } from './currencies';
export { Country, CountryAlpha2, CountryAlpha3, CountryNumeric } from './countries';
export declare function allCountries(): Country[];
export declare function getCountry(code: CountryAlpha2 | CountryAlpha3 | CountryNumeric): Country;
export declare function getCountriesForCurrency(code: CurrencyAlphabeticCode): CountryAlpha3[];
