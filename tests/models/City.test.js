'use strict';

const City = require('./../../models/City');
const testCity = {
    name: 'Berlin',
    latitude: 52.5186,
    longitude: 13.4081
};

describe('models/City', () => {
    describe('Instance creation', () => {
        test('creates a city instance', () => {
            let berlin = new City(testCity.name, testCity.latitude, testCity.longitude);
            expect(berlin).toBeInstanceOf(City);
            expect(berlin).toEqual(testCity);
        });

        test ('fails to create a city instance without a name', () => {
            let wrongCity = () => {
                new City('', 54, 17);
            };
            expect(wrongCity).toThrow(TypeError);
        });
        test ('fails to create a city instance with the wrong type of name', () => {
            let wrongCity = () => {
                new City(81, 54, 17);
            };
            expect(wrongCity).toThrow(TypeError);
        });
        test ('fails to create a city instance with wrong latitude', () => {
            let wrongCity = () => {
                new City('SomeCity', 95, 17);
            };
            expect(wrongCity).toThrow(TypeError);
        });
        test ('fails to create a city instance with wrong longitude', () => {
            let wrongCity = () => {
                new City('SomeCity', 55, -200);
            };
            expect(wrongCity).toThrow(TypeError);
        });
    });
    describe ('Instance Methods', () => {
        test('calculates the distance to a known set of coordinates', () => {
            //distance Berlin-Potsdam : 27 Km (http://dateandtime.info/es/distance.php?id1=2950159&id2=2852458)
            let berlin = new City(testCity.name, testCity.latitude, testCity.longitude);
            let potsdam = {
                latitude: 52.3989,
                longitude: 13.0657
            };
            let distance = Math.round(berlin.distanceToCity(potsdam.latitude, potsdam.longitude, 'km'));
            expect(distance).toBe(27);
        });

        test('throws a validation error if latitude is wrong', () => {
            let berlin = new City(testCity.name, testCity.latitude, testCity.longitude);
            let wrongCoords = {
                latitude: 93.0987,
                longitude: 13.0657
            };
            let distance = () => {
                Math.round(berlin.distanceToCity(wrongCoords.latitude, wrongCoords.longitude, 'km'));
            };
            expect(distance).toThrow(TypeError);
        });

        test('throws a validation error if longitude is wrong', () => {
            let berlin = new City(testCity.name, testCity.latitude, testCity.longitude);
            let wrongCoords = {
                latitude: 57.0987,
                longitude: 192.0864
            };
            let distance = () => {
                Math.round(berlin.distanceToCity(wrongCoords.latitude, wrongCoords.longitude, 'km'));
            };
            expect(distance).toThrow(TypeError);
        });

        test('throws a validation error if distance units are invalid', () => {
            let berlin = new City(testCity.name, testCity.latitude, testCity.longitude);
            let validCoords = {
                latitude: 52.3989,
                longitude: 13.0657
            };
            let distance = () => {
                Math.round(berlin.distanceToCity(validCoords.latitude, validCoords.longitude, 'cm'));
            };
            expect(distance).toThrow(RangeError);
        });

        test('returns true if 2 locations are within the given range', () => {
            let berlin = new City(testCity.name, testCity.latitude, testCity.longitude);
            let potsdam = {
                latitude: 52.3989,
                longitude: 13.0657
            };
            let isInRange = berlin.isWithinDistance(potsdam.latitude, potsdam.longitude, 'km', 30);
            expect(isInRange).toBeTruthy();
        });

        test('returns false if 2 locations are outside the given range', () => {
            let berlin = new City(testCity.name, testCity.latitude, testCity.longitude);
            let potsdam = {
                latitude: 52.3989,
                longitude: 13.0657
            };
            let isInRange = berlin.isWithinDistance(potsdam.latitude, potsdam.longitude, 'km', 10);
            expect(isInRange).toBeFalsy();
        });

        test('Throws a validation error if given range parameters are invalid', () => {
            let berlin = new City(testCity.name, testCity.latitude, testCity.longitude);
            let potsdam = {
                latitude: 52.3989,
                longitude: 13.0657
            };
            let isInRange = () => {
                berlin.isWithinDistance(potsdam.latitude, potsdam.longitude, 'km', 'someValue')
            };
            expect(isInRange).toThrow(TypeError);
        });

    });

});