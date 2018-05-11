'use strict';

process.env.NODE_ENV = 'test';
require('./../../../server/config/config');

const appParameters = {
    PORT: "5000",
    MIN_DIST_RANGE_KM: "0",
    MAX_DIST_RANGE_KM: "100",
    MIN_AGE_RANGE: "18",
    MAX_AGE_RANGE: "95",
    MIN_HEIGHT: "135",
    MAX_HEIGHT: "210"
};
describe('server/config/config', () => {
    test('PORT parameter should be set', () => {
        expect(process.env.PORT).toBeDefined();
        expect(process.env.PORT).toBe(appParameters.PORT);
    });

    test('MIN_DIST_RANGE_KM parameter should be set', () => {
        expect(process.env.MIN_DIST_RANGE_KM).toBeDefined();
        expect(process.env.MIN_DIST_RANGE_KM).toBe(appParameters.MIN_DIST_RANGE_KM);
    });

    test('MAX_DIST_RANGE_KM parameter should be set', () => {
        expect(process.env.MAX_DIST_RANGE_KM).toBeDefined();
        expect(process.env.MAX_DIST_RANGE_KM).toBe(appParameters.MAX_DIST_RANGE_KM);
    });

    test('MIN_AGE_RANGE parameter should be set', () => {
        expect(process.env.MIN_AGE_RANGE).toBeDefined();
        expect(process.env.MIN_AGE_RANGE).toBe(appParameters.MIN_AGE_RANGE);
    });

    test('MAX_AGE_RANGE parameter should be set', () => {
        expect(process.env.MAX_AGE_RANGE).toBeDefined();
        expect(process.env.MAX_AGE_RANGE).toBe(appParameters.MAX_AGE_RANGE);
    });

    test('MIN_HEIGHT parameter should be set', () => {
        expect(process.env.MIN_HEIGHT).toBeDefined();
        expect(process.env.MIN_HEIGHT).toBe(appParameters.MIN_HEIGHT);
    });

    test('MAX_HEIGHT parameter should be set', () => {
        expect(process.env.MAX_HEIGHT).toBeDefined();
        expect(process.env.MAX_HEIGHT).toBe(appParameters.MAX_HEIGHT);
    });
});
