// format.ts

/*
 * Copyright (c) 2021 Check Digit, LLC
 *
 * This code is licensed under the MIT license (see LICENSE.txt for details).
 */

import { CurrencyAlphabeticCode, getMinorUnitDigits } from './currency';

export type Amount = string | bigint | -0;

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

export const defaultCurrencyFormatOptions: CurrencyFormatOptions = Object.freeze({
  currencyDisplay: 'symbol',
  useCurrency: true,
  useGrouping: true,
  useDecimal: true,
  minorUnitDigits: undefined
}) ;

export function format(
  { amount, currency }: Money,
  options?: CurrencyFormatOptions,
  locales?: string | string[]
): string {
  const resolvedOptions: CurrencyFormatOptions = { ...defaultCurrencyFormatOptions, ...options };
  const amountInteger = typeof amount === 'bigint' ? amount : BigInt(amount);
  let minorUnitDigits: number;
  const currencyFull = currency;
  if (typeof resolvedOptions.minorUnitDigits === 'number') {
    minorUnitDigits = resolvedOptions.minorUnitDigits
    // Provide a dummy value for Intl.NumberFormat
    currency = "FOO"
  } else {
    minorUnitDigits = getMinorUnitDigits(currency as CurrencyAlphabeticCode)
  }
  const minorUnit = BigInt(10) ** BigInt(minorUnitDigits);

  /*
   * Calculate the minor unit amount, while also handling locales that use different digit symbols than 0 thru 9.
   */
  const minorUnitAmount = Intl.NumberFormat(locales, { useGrouping: false })
    .format(Number((amountInteger < BigInt(0) ? -amountInteger : amountInteger) % minorUnit))
    .padStart(minorUnitDigits, Intl.NumberFormat(locales, { useGrouping: false }).format(0));

  // this code is required to handle the case of negative zero, since bigints do not support negative zero
  let majorUnitAmount: number | bigint =
    Number(amount) === 0 ? Number(amount) / Number(minorUnit) : amountInteger / minorUnit;

  if (!resolvedOptions.useDecimal && !(!resolvedOptions.useCurrency && !resolvedOptions.useGrouping)) {
    throw Error('useDecimal can only be false if useCurrency and useGrouping are also false');
  }

  if (amountInteger < 0 && majorUnitAmount === BigInt(0)) {
    // since we lose the sign if the major unit amount is zero, need to switch to floating point for negative zero
    majorUnitAmount = -0;
  }

  return (
    Intl.NumberFormat(locales, {
      style: 'currency',
      currency,
      useGrouping: resolvedOptions.useGrouping,
      currencyDisplay: resolvedOptions.currencyDisplay,
    })
      // node 12+ supports BigInt as number parameter to formatToParts, but built-in Typescript type currently does not
      .formatToParts((majorUnitAmount as unknown) as number)
      .filter(
        ({ type }) =>
          (type !== 'currency' || resolvedOptions.useCurrency) && (type !== 'decimal' || resolvedOptions.useDecimal)
      )
      .map((part) => {
        switch(part.type) {
          case 'fraction': return minorUnitAmount
          case 'currency':
            return currency != currencyFull ? currencyFull : part.value
          default: return part.value
       }
      })
      .join('')
  );
}
