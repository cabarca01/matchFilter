'use strict';

const haversine = require('haversine');

const isValidCoord = (type, value) => {
    if ((type !== 'latitude' && type !== 'longitude') || typeof value !== 'number') {
        return false;
    }
    else if (type === 'latitude' && (value < -90.0 || value > 90) ){
        return false;
    }
    else if (type === 'longitude' && (value < -180.0 || value > 180) ){
        return false;
    }
    return true;
};
const validUnits = ['km', 'mile', 'meter', 'nmi'];

class City {
    constructor(name, latitude, longitude){
        // parameter validation
        if (!name || typeof name !== 'string' || name.length < 1) {
            throw new TypeError('The name of the city is required and must be a non-empty string');
        }
        if (!isValidCoord('latitude', latitude)) {
            throw new TypeError('The latitude must be a floating-point number between -90 and 90 degrees');
        }
        if (!isValidCoord('longitude', longitude)) {
            throw new TypeError('The longitude must be a floating-point number between -180 and 180 degrees');
        }

        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    distanceToCity(latitude, longitude, unit){
        // parameter validation
        if (!isValidCoord('latitude', latitude)) {
            throw new TypeError('The latitude must be a floating-point number between -90 and 90 degrees');
        }
        if (!isValidCoord('longitude', longitude)) {
            throw new TypeError('The longitude must be a floating-point number between -180 and 180 degrees');
        }
        if (validUnits.indexOf(unit) < 0) {
            throw new RangeError('The distance unit must be km, mile, meter or nmi');
        }

        let origin = {latitude, longitude};
        let destination = {
            latitude: this.latitude,
            longitude: this.longitude
        };
        return haversine(origin, destination, {unit: unit})
    }

    isWithinDistance(latitude, longitude, unit, range){
        // parameter validation
        if (typeof range !== 'number') {
            throw new TypeError('The distance must be a number');
        }
        let distance = this.distanceToCity(latitude, longitude, unit);
        return range > distance;
    }
}

module.exports = City;
