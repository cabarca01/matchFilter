'use strict';

process.env.NODE_ENV = 'test';
require('./../../server/config/config');

const rewire = require('rewire');
const matchController = rewire('./../../controllers/matchController');
const _ = require('lodash');

const testDataJson = {
    "matches": [
        {
            "display_name": "Caroline",
            "age": 41,
            "job_title": "Corporate Lawyer",
            "height_in_cm": 153,
            "city": {
                "name": "Leeds",
                "lat": 53.801277,
                "lon": -1.548567
            },
            "main_photo": "http://thecatapi.com/api/images/get?format=src&type=gif",
            "compatibility_score": 0.76,
            "contacts_exchanged": 2,
            "favourite": true,
            "religion": "Atheist"
        },
        {
            "display_name": "Sharon",
            "age": 47,
            "job_title": "Doctor",
            "height_in_cm": 161,
            "city": {
                "name": "Solihull",
                "lat": 52.412811,
                "lon": -1.778197
            },
            "compatibility_score": 0.97,
            "contacts_exchanged": 0,
            "favourite": false,
            "religion": "Islam"
        },
        {
            "display_name": "Natalia",
            "age": 38,
            "job_title": "Project Manager",
            "height_in_cm": 144,
            "city": {
                "name": "Cardiff",
                "lat": 51.481583,
                "lon": -3.179090
            },
            "main_photo": "http://thecatapi.com/api/images/get?format=src&type=gif",
            "compatibility_score": 0.47,
            "contacts_exchanged": 5,
            "favourite": false,
            "religion": "Christian"
        }
    ]
};

let filter;

describe('controllers/matchController', () => {
   describe ('applyFilters', () => {
       beforeAll(()=> {
           let databaseMock = {
               loadDataFromJSONFile: (filename) => {
                   expect(filename).toBe('matches.json');
                   return testDataJson;
               }
           };
           matchController.__set__("database", databaseMock);
           matchController.__set__("filterLimits", {
               max_distance_limit: process.env.MAX_DIST_RANGE_KM,
               max_age_limit: process.env.MAX_AGE_RANGE,
               min_height_limit: process.env.MIN_HEIGHT
           });
       });

       beforeEach(() => {
           filter = {
               hasPhoto: false,
               inContact: false,
               isFavourite: false,
               minCompatibilityScore: 0.01,
               maxCompatibilityScore: 0.99,
               minAge: 18,
               maxAge: 95,
               minHeight: 135,
               maxHeight: 210,
               distance: 300,
               city: {
                   name: 'Leeds',
                   latitude: 53.801277,
                   longitude: -1.548567
               }
           };
       });

       test('Returns full set of matches with default filter', () => {
           let filteredMatch = matchController.applyFilters(filter);
           expect(filteredMatch.length).toBe(3);
           expect(_.find(filteredMatch, {display_name: 'Natalia'})).not.toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Caroline'})).not.toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Sharon'})).not.toBeUndefined();
       });

       test('Returns only the matches that have a photo', () => {
           filter.hasPhoto = true;
           let filteredMatch = matchController.applyFilters(filter);
           expect(filteredMatch.length).toBe(2);
           expect(_.find(filteredMatch, {display_name: 'Natalia'})).not.toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Caroline'})).not.toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Sharon'})).toBeUndefined();
       });

       test('Returns only the matches that are in contact', () => {
           filter.inContact = true;
           let filteredMatch = matchController.applyFilters(filter);
           expect(filteredMatch.length).toBe(2);
           expect(_.find(filteredMatch, {display_name: 'Natalia'})).not.toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Caroline'})).not.toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Sharon'})).toBeUndefined();
       });

       test('Returns only the matches that are marked as favourite', () => {
           filter.isFavourite = true;
           let filteredMatch = matchController.applyFilters(filter);
           expect(filteredMatch.length).toBe(1);
           expect(_.find(filteredMatch, {display_name: 'Natalia'})).toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Caroline'})).not.toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Sharon'})).toBeUndefined();
       });

       test('Returns only the matches that are compatible between 70% and 90%', () => {
           filter.minCompatibilityScore = 0.7;
           filter.maxCompatibilityScore = 0.9;
           let filteredMatch = matchController.applyFilters(filter);
           expect(filteredMatch.length).toBe(1);
           expect(_.find(filteredMatch, {display_name: 'Natalia'})).toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Caroline'})).not.toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Sharon'})).toBeUndefined();
       });

       test('Returns only the matches that are between 30 and 41 years old', () => {
           filter.minAge = 30;
           filter.maxAge = 41;
           let filteredMatch = matchController.applyFilters(filter);
           expect(filteredMatch.length).toBe(2);
           expect(_.find(filteredMatch, {display_name: 'Natalia'})).not.toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Caroline'})).not.toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Sharon'})).toBeUndefined();
       });

       test('Returns only the matches that are between 150cm and 180cm high', () => {
           filter.minHeight = 150;
           filter.maxHeight = 180;
           let filteredMatch = matchController.applyFilters(filter);
           expect(filteredMatch.length).toBe(2);
           expect(_.find(filteredMatch, {display_name: 'Natalia'})).toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Caroline'})).not.toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Sharon'})).not.toBeUndefined();
       });

       test('Returns only the matches that are closer than 30 km', () => {
           filter.distance = 30;
           let filteredMatch = matchController.applyFilters(filter);
           expect(filteredMatch.length).toBe(1);
           expect(_.find(filteredMatch, {display_name: 'Natalia'})).toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Caroline'})).not.toBeUndefined();
           expect(_.find(filteredMatch, {display_name: 'Sharon'})).toBeUndefined();
       });
   });

   describe('match_filtered_list', () => {
       test('calls the filter function to obtain a filtered list of values', () => {
           let req = {
               body: {
                   hasPhoto: false,
                   inContact: false,
                   isFavourite: false,
                   minCompatibilityScore: 0.01,
                   maxCompatibilityScore: 0.99,
                   minAge: 18,
                   maxAge: 95,
                   minHeight: 135,
                   maxHeight: 210,
                   distance: 300,
                   city: {
                       name: 'Leeds',
                       latitude: 53.801277,
                       longitude: -1.548567
                   }
               }
           };
           let res = {
               send: (data) => {
                   let response = JSON.parse(data);
                   expect(response.matchList.length).toBe(3);
               }
           };

           const spy = jest.spyOn(matchController, 'applyFilters');

           matchController.__set__('applyFilters', spy);
           matchController.match_filtered_list(req, res);

           expect(spy).toHaveBeenCalledTimes(1);

           spy.mockReset();
           spy.mockRestore();
       })
   });
});