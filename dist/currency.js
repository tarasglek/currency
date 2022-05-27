"use strict";
// currency.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSymbol = exports.getMinorUnitDigits = exports.getCurrency = exports.allCurrencies = void 0;
/*
 * Copyright (c) 2021 Check Digit, LLC
 *
 * This code is licensed under the MIT license (see LICENSE.txt for details).
 */
const currencies_1 = __importDefault(require("./currencies"));
var currencies_2 = require("./currencies");
function allCurrencies() {
    return currencies_1.default;
}
exports.allCurrencies = allCurrencies;
function getCurrency(code) {
    const currency = allCurrencies().find(({ alphabeticCode, numericCode }) => code === alphabeticCode || code === numericCode);
    if (typeof currency === 'undefined') {
        // this should not happen unless an invalid string is coerced into the code parameter
        throw Error(`Currency not found for code '${code}'`);
    }
    return currency;
}
exports.getCurrency = getCurrency;
function getMinorUnitDigits(currency) {
    return getCurrency(currency).minorUnits ?? 2;
}
exports.getMinorUnitDigits = getMinorUnitDigits;
function getSymbol(currency, locales) {
    return Intl.NumberFormat(locales, { style: 'currency', currency })
        .formatToParts(0)
        .filter((part) => part.type === 'currency')[0]?.value;
}
exports.getSymbol = getSymbol;
//# sourceMappingURL=currency.js.map