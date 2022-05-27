"use strict";
// currency.spec.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2021 Check Digit, LLC
 *
 * This code is licensed under the MIT license (see LICENSE.txt for details).
 */
const assert = __importStar(require("assert"));
const index_1 = require("./index");
describe('currency', () => {
    it('getMinorUnitDigits returns correct number for each currency', () => {
        assert.strictEqual((0, index_1.getMinorUnitDigits)('USD'), 2);
        assert.strictEqual((0, index_1.getMinorUnitDigits)('JPY'), 0);
    });
    it('getCurrency will find currencies based on numeric or alphabetic codes', () => {
        assert.deepStrictEqual((0, index_1.getCurrency)('NZD'), {
            alphabeticCode: 'NZD',
            minorUnits: 2,
            name: 'New Zealand Dollar',
            numericCode: '554',
        });
        assert.deepStrictEqual((0, index_1.getCurrency)('USD'), {
            alphabeticCode: 'USD',
            minorUnits: 2,
            name: 'US Dollar',
            numericCode: '840',
        });
        assert.deepStrictEqual((0, index_1.getCurrency)('AUD'), (0, index_1.getCurrency)('036'));
        assert.deepStrictEqual((0, index_1.getCurrency)('CAD'), (0, index_1.getCurrency)('124'));
        assert.deepStrictEqual((0, index_1.getCurrency)('NZD'), (0, index_1.getCurrency)('554'));
        assert.deepStrictEqual((0, index_1.getCurrency)('EUR'), (0, index_1.getCurrency)('978'));
        assert.deepStrictEqual((0, index_1.getCurrency)('KRW'), (0, index_1.getCurrency)('410'));
        assert.deepStrictEqual((0, index_1.getCurrency)('USD'), (0, index_1.getCurrency)('840'));
        assert.throws(() => (0, index_1.getCurrency)(undefined), /^Error: Currency not found for code 'undefined'$/u);
        assert.throws(() => (0, index_1.getCurrency)(''), /^Error: Currency not found for code ''$/u);
        assert.throws(() => (0, index_1.getCurrency)(840), /^Error: Currency not found for code '840'$/u);
        assert.throws(() => (0, index_1.getCurrency)('INVALID'), /^Error: Currency not found for code 'INVALID'$/u);
    });
    it('getSymbol', () => {
        const currencies = (0, index_1.allCurrencies)().map(({ alphabeticCode }) => (0, index_1.getSymbol)(alphabeticCode));
        assert.ok(currencies.every((currency) => typeof currency === 'string' && currency.length > 0));
        assert.strictEqual((0, index_1.getSymbol)('USD'), '$');
        assert.strictEqual((0, index_1.getSymbol)('CAD'), 'CA$');
        assert.strictEqual((0, index_1.getSymbol)('NZD'), 'NZ$');
        assert.strictEqual((0, index_1.getSymbol)('JPY'), '¥');
    });
    it('getSymbol for non-US locales', () => {
        assert.strictEqual((0, index_1.getSymbol)('JPY', 'ja-JP'), '￥');
        assert.strictEqual((0, index_1.getSymbol)('NZD', 'en-NZ'), '$');
        assert.strictEqual((0, index_1.getSymbol)('CAD', 'en-CA'), '$');
    });
});
//# sourceMappingURL=currency.spec.js.map