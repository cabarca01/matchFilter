'use strict';

const db = require('./../../../server/utils/database');

describe('server/utils/database', () => {
    test('should open the test file and parse it', () => {
        let testArray = db.loadDataFromJSONFile('test.json');
        expect(testArray).toBeInstanceOf(Object);
        expect(testArray).toEqual({
            node1:[
                {
                    subnode1: {
                        property: 'value1'
                    }
                },
                {
                    subnode2: {
                        property: 'value2'
                    }
                }
            ]
        });
    });

    test('should throw an Error when file is invalid', () => {
        const fail = () => {
            let data = db.loadDataFromJSONFile('someFile.json');
        };
        expect(fail).toThrow(Error);
    });
});