"use strict";
// country.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountriesForCurrency = exports.getCountry = exports.allCountries = void 0;
/*
 * Copyright (c) 2021 Check Digit, LLC
 *
 * This code is licensed under the MIT license (see LICENSE.txt for details).
 */
const countries_1 = __importDefault(require("./countries"));
var countries_2 = require("./countries");
function allCountries() {
    return countries_1.default;
}
exports.allCountries = allCountries;
function getCountry(code) {
    const country = allCountries().find(({ alpha2, alpha3, numeric }) => code === alpha2 || code === alpha3 || code === numeric);
    if (typeof country === 'undefined') {
        // this should not happen unless an invalid string is coerced into the code parameter
        throw Error(`Country not found for code '${code}'`);
    }
    return country;
}
exports.getCountry = getCountry;
function getCountriesForCurrency(code) {
    return allCountries()
        .filter(({ currencyCodes }) => currencyCodes.includes(code))
        .map(({ alpha3 }) => alpha3)
        .sort();
}
exports.getCountriesForCurrency = getCountriesForCurrency;
//# sourceMappingURL=country.js.map