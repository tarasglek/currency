"use strict";
// format.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = exports.defaultCurrencyFormatOptions = void 0;
/*
 * Copyright (c) 2021 Check Digit, LLC
 *
 * This code is licensed under the MIT license (see LICENSE.txt for details).
 */
const currency_1 = require("./currency");
exports.defaultCurrencyFormatOptions = Object.freeze({
    currencyDisplay: 'symbol',
    useCurrency: true,
    useGrouping: true,
    useDecimal: true,
    minorUnitDigits: undefined
});
function format({ amount, currency }, options, locales) {
    const resolvedOptions = { ...exports.defaultCurrencyFormatOptions, ...options };
    const amountInteger = typeof amount === 'bigint' ? amount : BigInt(amount);
    let minorUnitDigits;
    const currencyFull = currency;
    if (typeof resolvedOptions.minorUnitDigits === 'number') {
        minorUnitDigits = resolvedOptions.minorUnitDigits;
        // Provide a dummy value for Intl.NumberFormat
        currency = "FOO";
    }
    else {
        minorUnitDigits = (0, currency_1.getMinorUnitDigits)(currency);
    }
    const minorUnit = BigInt(10) ** BigInt(minorUnitDigits);
    /*
     * Calculate the minor unit amount, while also handling locales that use different digit symbols than 0 thru 9.
     */
    const minorUnitAmount = Intl.NumberFormat(locales, { useGrouping: false })
        .format(Number((amountInteger < BigInt(0) ? -amountInteger : amountInteger) % minorUnit))
        .padStart(minorUnitDigits, Intl.NumberFormat(locales, { useGrouping: false }).format(0));
    // this code is required to handle the case of negative zero, since bigints do not support negative zero
    let majorUnitAmount = Number(amount) === 0 ? Number(amount) / Number(minorUnit) : amountInteger / minorUnit;
    if (!resolvedOptions.useDecimal && !(!resolvedOptions.useCurrency && !resolvedOptions.useGrouping)) {
        throw Error('useDecimal can only be false if useCurrency and useGrouping are also false');
    }
    if (amountInteger < 0 && majorUnitAmount === BigInt(0)) {
        // since we lose the sign if the major unit amount is zero, need to switch to floating point for negative zero
        majorUnitAmount = -0;
    }
    return (Intl.NumberFormat(locales, {
        style: 'currency',
        currency,
        useGrouping: resolvedOptions.useGrouping,
        currencyDisplay: resolvedOptions.currencyDisplay,
    })
        // node 12+ supports BigInt as number parameter to formatToParts, but built-in Typescript type currently does not
        .formatToParts(majorUnitAmount)
        .filter(({ type }) => (type !== 'currency' || resolvedOptions.useCurrency) && (type !== 'decimal' || resolvedOptions.useDecimal))
        .map((part) => {
        switch (part.type) {
            case 'fraction': return minorUnitAmount;
            case 'currency':
                return currency != currencyFull ? currencyFull : part.value;
            default: return part.value;
        }
    })
        .join(''));
}
exports.format = format;
//# sourceMappingURL=format.js.map