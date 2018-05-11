'use strict';

const Match = require('./../../models/Match');
const City = require('./../../models/City');

const testMatch = {
    display_name: 'SomeName',
    age: 21,
    job_title: 'SomeJob',
    photo: 'somePhotoUrl',
    height_in_cm: 150,
    religion: 'someReligion',
    city: new City('Berlin', 52.5186, 13.4081),
    compatibilityScore: 0.9023,
    contactsExchanged: 0,
    favourite: true
};

describe('models/Match', () => {
    test('creates a Match instance', () => {
        let someMatch = new Match(testMatch.display_name,       testMatch.age,               testMatch.job_title,
                                  testMatch.height_in_cm,       testMatch.photo,             testMatch.religion,
                                  testMatch.city.name,          testMatch.city.latitude,     testMatch.city.longitude,
                                  testMatch.compatibilityScore, testMatch.contactsExchanged, testMatch.favourite);
        expect(someMatch).toBeInstanceOf(Match);
        expect(someMatch).toEqual(testMatch);
    });

    test('throws TypeError if compatibility score is not a number', () => {
        let wrongMatch = () => {
            new Match(testMatch.display_name,       testMatch.age,               testMatch.job_title,
                      testMatch.height_in_cm,       testMatch.photo,             testMatch.religion,
                      testMatch.city.name,          testMatch.city.latitude,     testMatch.city.longitude,
                      'SomeScore',                  testMatch.contactsExchanged, testMatch.favourite);
        };
        expect(wrongMatch).toThrow(TypeError);
    });

    test('throws RangeError if compatibility score is not a number between 0.01 and 0.99', () => {
        let wrongMatch = () => {
            new Match(testMatch.display_name,       testMatch.age,               testMatch.job_title,
                      testMatch.height_in_cm,       testMatch.photo,             testMatch.religion,
                      testMatch.city.name,          testMatch.city.latitude,     testMatch.city.longitude,
                      2,                            testMatch.contactsExchanged, testMatch.favourite);
        };
        expect(wrongMatch).toThrow(RangeError);
    });

    test('throws TypeError if number of contacts exchanged is not a number', () => {
        let wrongMatch = () => {
            new Match(testMatch.display_name,       testMatch.age,               testMatch.job_title,
                      testMatch.height_in_cm,       testMatch.photo,             testMatch.religion,
                      testMatch.city.name,          testMatch.city.latitude,     testMatch.city.longitude,
                      testMatch.compatibilityScore, 'someNumber',                testMatch.favourite);
        };
        expect(wrongMatch).toThrow(TypeError);
    });

    test('throws TypeError if favourite indicator is not boolean', () => {
        let wrongMatch = () => {
            new Match(testMatch.display_name,       testMatch.age,               testMatch.job_title,
                      testMatch.height_in_cm,       testMatch.photo,             testMatch.religion,
                      testMatch.city.name,          testMatch.city.latitude,     testMatch.city.longitude,
                      testMatch.compatibilityScore, testMatch.contactsExchanged, 'Isfavourite');
        };
        expect(wrongMatch).toThrow(TypeError);
    });
});