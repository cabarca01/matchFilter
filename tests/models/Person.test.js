'use strict';

const Person = require('./../../models/Person');
const City = require('./../../models/City');

const testPerson = {
    display_name: 'SomeName',
    age: 21,
    job_title: 'SomeJob',
    photo: 'somePhotoUrl',
    height_in_cm: 150,
    religion: 'someReligion',
    city: new City('Berlin', 52.5186, 13.4081)
};

describe('models/Person', () => {
    test('creates a Person instance', () => {
        let somePerson = new Person(testPerson.display_name,  testPerson.age,           testPerson.job_title,
                                    testPerson.height_in_cm,  testPerson.photo,         testPerson.religion,
                                    testPerson.city.name,     testPerson.city.latitude, testPerson.city.longitude);

        expect(somePerson).toBeInstanceOf(Person);
        expect(somePerson).toEqual(testPerson);
    });

    test('throws TypeError if display_name is not a string', () => {
        let wrongPerson = () => {
            new Person(34,                       testPerson.age,           testPerson.job_title,
                       testPerson.height_in_cm,  testPerson.photo,         testPerson.religion,
                       testPerson.city.name,     testPerson.city.latitude, testPerson.city.longitude);
        };
        expect(wrongPerson).toThrow(TypeError);
    });

    test('throws TypeError if age is not a number', () => {
        let wrongPerson = () => {
            new Person(testPerson.display_name, 'someAge',                testPerson.job_title,
                       testPerson.height_in_cm, testPerson.photo,         testPerson.religion,
                       testPerson.city.name,    testPerson.city.latitude, testPerson.city.longitude);
        };
        expect(wrongPerson).toThrow(TypeError);
    });

    test('throws TypeError if person is a minor', () => {
        let wrongPerson = () => {
            new Person(testPerson.display_name, 15,                       testPerson.job_title,
                       testPerson.height_in_cm, testPerson.photo,         testPerson.religion,
                       testPerson.city.name,    testPerson.city.latitude, testPerson.city.longitude);
        };
        expect(wrongPerson).toThrow(TypeError);
    });

    test('throws TypeError if job is not a string', () => {
        let wrongPerson = () => {
            new Person(testPerson.display_name, testPerson.age,           12,
                       testPerson.height_in_cm, testPerson.photo,         testPerson.religion,
                       testPerson.city.name,    testPerson.city.latitude, testPerson.city.longitude);
        };
        expect(wrongPerson).toThrow(TypeError);
    });

    test('throws TypeError if religion is not a string', () => {
        let wrongPerson = () => {
            new Person(testPerson.display_name, testPerson.age,           testPerson.job_title,
                       testPerson.height_in_cm, testPerson.photo,         12,
                       testPerson.city.name,    testPerson.city.latitude, testPerson.city.longitude);
        };
        expect(wrongPerson).toThrow(TypeError);
    });

    test('throws TypeError if photo is not a string', () => {
        let wrongPerson = () => {
            new Person(testPerson.display_name, testPerson.age,           testPerson.job_title,
                       testPerson.height_in_cm, 12,                       testPerson.religion,
                       testPerson.city.name,    testPerson.city.latitude, testPerson.city.longitude);
        };
        expect(wrongPerson).toThrow(TypeError);
    });

    test('throws TypeError if height is not a positive number', () => {
        let wrongPerson = () => {
            new Person(testPerson.display_name, testPerson.age,           testPerson.job_title,
                       0,                       testPerson.photo,         testPerson.religion,
                       testPerson.city.name,    testPerson.city.latitude, testPerson.city.longitude);
        };
        expect(wrongPerson).toThrow(TypeError);
    });

    test('throws TypeError if a city object cannot be created', () => {
        let wrongPerson = () => {
            new Person(testPerson.display_name, testPerson.age,    testPerson.job_title,
                testPerson.height_in_cm, testPerson.photo,         testPerson.religion,
                testPerson.city.name,    110,                      testPerson.city.longitude);
        };
        expect(wrongPerson).toThrow(TypeError);
    });
});