'use strict';

const Person = require('./Person');

class Match extends Person {
    constructor(name, age, job, height, photo, religion, cityName, cityLat, cityLong, compat, contactEx, favourite){
        super(name, age, job, height, photo, religion, cityName, cityLat, cityLong);

        if (typeof compat !== 'number') {
            throw new TypeError('The compatibility score must be a number');
        }
        if (compat < 0.01 || compat > 0.99) {
            throw new RangeError('The compatibility score must be a number between 0.01 and 0.99');
        }
        if (typeof contactEx !== 'number') {
            throw new TypeError('The number of contacts exchanged must be a number');
        }
        if (typeof favourite !== 'boolean') {
            throw new TypeError('The favourite identifier must be either true or false');
        }

        this.compatibilityScore = compat;
        this.contactsExchanged = contactEx;
        this.favourite = favourite;
    }
}

module.exports = Match;
