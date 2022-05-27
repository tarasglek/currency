"use strict";
// country.spec.ts
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
describe('country', () => {
    it('getAll returns all countries', () => {
        assert.strictEqual((0, index_1.allCountries)().length, 245);
    });
    it('getCountry will find a country based on alpha2, alpha3 or numeric code', () => {
        assert.deepStrictEqual((0, index_1.getCountry)('USA'), {
            alpha2: 'US',
            alpha3: 'USA',
            currencyCodes: ['USD'],
            name: 'US',
            numeric: '840',
        });
        assert.deepStrictEqual((0, index_1.getCountry)('NZ'), {
            alpha2: 'NZ',
            alpha3: 'NZL',
            currencyCodes: ['NZD'],
            name: 'New Zealand',
            numeric: '554',
        });
        assert.deepStrictEqual((0, index_1.getCountry)('332'), {
            alpha2: 'HT',
            alpha3: 'HTI',
            currencyCodes: ['HTG', 'USD'],
            name: 'Haiti',
            numeric: '332',
        });
        assert.deepStrictEqual((0, index_1.getCountry)('AUS'), (0, index_1.getCountry)('036'));
        assert.deepStrictEqual((0, index_1.getCountry)('036'), (0, index_1.getCountry)('AU'));
        assert.deepStrictEqual((0, index_1.getCountry)('USA'), (0, index_1.getCountry)('840'));
        assert.deepStrictEqual((0, index_1.getCountry)('840'), (0, index_1.getCountry)('US'));
        assert.throws(() => (0, index_1.getCountry)(undefined), /^Error: Country not found for code 'undefined'$/u);
        assert.throws(() => (0, index_1.getCountry)(''), /^Error: Country not found for code ''$/u);
        assert.throws(() => (0, index_1.getCountry)(840), /^Error: Country not found for code '840'$/u);
        assert.throws(() => (0, index_1.getCountry)('INVALID'), /^Error: Country not found for code 'INVALID'$/u);
    });
    it('getCountriesForCurrency will return countries (in sorted order) that use a particular currency', () => {
        assert.deepStrictEqual((0, index_1.getCountriesForCurrency)('JPY'), ['JPN']);
        assert.deepStrictEqual((0, index_1.getCountriesForCurrency)('CAD'), ['CAN']);
        assert.deepStrictEqual((0, index_1.getCountriesForCurrency)('NZD'), ['COK', 'NIU', 'NZL', 'PCN', 'TKL']);
        assert.deepStrictEqual((0, index_1.getCountriesForCurrency)('AUD'), ['AUS', 'CCK', 'CXR', 'HMD', 'KIR', 'NFK', 'NRU', 'TUV']);
        assert.deepStrictEqual((0, index_1.getCountriesForCurrency)('USD'), [
            'ASM',
            'BES',
            'ECU',
            'FSM',
            'GUM',
            'HTI',
            'IOT',
            'MHL',
            'MNP',
            'PAN',
            'PLW',
            'PRI',
            'SLV',
            'TCA',
            'TLS',
            'UMI',
            'USA',
            'VGB',
            'VIR',
        ]);
        assert.deepStrictEqual((0, index_1.getCountriesForCurrency)('EUR'), [
            'ALA',
            'AND',
            'ATF',
            'AUT',
            'BEL',
            'BLM',
            'CYP',
            'DEU',
            'ESP',
            'EST',
            'FIN',
            'FRA',
            'GLP',
            'GRC',
            'GUF',
            'IRL',
            'ITA',
            'LTU',
            'LUX',
            'LVA',
            'MAF',
            'MCO',
            'MLT',
            'MNE',
            'MTQ',
            'MYT',
            'NLD',
            'PRT',
            'REU',
            'SMR',
            'SPM',
            'SVK',
            'SVN',
            'VAT',
        ]);
        assert.deepStrictEqual((0, index_1.getCountriesForCurrency)('XXX'), []);
        assert.deepStrictEqual((0, index_1.getCountriesForCurrency)(''), []);
        assert.deepStrictEqual((0, index_1.getCountriesForCurrency)(undefined), []);
    });
});
//# sourceMappingURL=country.spec.js.map