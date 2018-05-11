'use strict';

const City = require('./City');

class Person {
    constructor(name, age, job, height, photo, religion, cityName, cityLat, cityLong) {
        //parameter validation
        // will not validate required parameters as it was not specified in requirement.
        if (typeof name !== 'string') {
            throw new TypeError('name must be a string');
        }
        if (typeof age !== 'number' || age < 18) {
            throw new TypeError('The person must be 18 years old or older');
        }
        if (typeof job !== 'string') {
            throw new TypeError('The job Title must be a string');
        }
        if (typeof height !== 'number' || height <= 0) {
            throw new TypeError('The height must be a positive numeric value');
        }
        if (photo && typeof photo !== 'string') {
            throw new TypeError('The photo must be a string');
        }
        if (typeof religion !== 'string') {
            throw new TypeError('The religion must be a string');
        }

        let cityObj;
        try {
            cityObj = new City(cityName, cityLat, cityLong);
        } catch(e) {
            throw new TypeError('Could not create city with given parameters.');
        }

        this.display_name = name;
        this.age = Math.round(age);
        this.job_title = job;
        this.height_in_cm = Math.round(height);
        this.city = cityObj;
        this.photo = photo;
        this.religion = religion;
    }

}

module.exports = Person;
