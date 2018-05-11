'use strict';

const Match = require ('./../models/Match');
let database = require('./../server/utils/database');

let filterLimits = {
    max_distance_limit: process.env.MAX_DIST_RANGE_KM,
    max_age_limit: process.env.MAX_AGE_RANGE,
    min_height_limit: process.env.MIN_HEIGHT
};

let applyFilters = (parameters) => {
    let matchesDB = database.loadDataFromJSONFile('matches.json');

    let matchList = matchesDB.matches.map((match) => {
        return new Match(match.display_name,   match.age,                 match.job_title,          match.height_in_cm,
                         match.main_photo,     match.religion,            match.city.name,          match.city.lat,
                         match.city.lon,       match.compatibility_score, match.contacts_exchanged, match.favourite);
    });

    //apply filters
    // 1 -  Filter if match has photo
    if (parameters.hasPhoto) {
        matchList = matchList.filter((match) => typeof match.photo === 'string');
    }
    // 2- Filter if match is a contact
    if (parameters.inContact) {
        matchList = matchList.filter((match) => match.contactsExchanged > 0);
    }
    // 3 - Filter if match is a favourite
    if (parameters.isFavourite) {
        matchList = matchList.filter((match) => match.favourite);
    }
    // 4 - Filter by range of Compatibility score
    let minCS = parameters.minCompatibilityScore;
    let maxCS = parameters.maxCompatibilityScore;

    matchList = matchList.filter((match) => match.compatibilityScore >= minCS && match.compatibilityScore <= maxCS);
    // 5 - Filter by age - corner case: upper age limit should not filter by greater ages
    let minAge = parameters.minAge;
    let maxAge = parameters.maxAge;
    if (maxAge < filterLimits.max_age_limit) {
        matchList = matchList.filter((match) => match.age >= minAge && match.age <= maxAge);
    } else {
        matchList = matchList.filter((match) => match.age >= minAge);
    }

    // 6 - Filter by Height - corner case: upper limit should not filter by greater height
    let minHeight = parameters.minHeight;
    let maxHeight = parameters.maxHeight;

    if (maxHeight < filterLimits.max_height_limit) {
        matchList = matchList.filter((match) => match.height_in_cm >= minHeight && match.height_in_cm <= maxHeight);
    } else {
        matchList = matchList.filter((match) => match.height_in_cm >= minHeight);
    }

    // 7 - Filter by distance - corner case: only filter if distance is less tahn upper limit
    let userLongitude = parameters.city.longitude;
    let userLatitude = parameters.city.latitude;
    let distance = parameters.distance;

    if (distance < filterLimits.max_distance_limit) {
        matchList = matchList.filter((match) => match.city.isWithinDistance(userLatitude, userLongitude, 'km', distance));
    }

    return matchList;
};

const match_filtered_list = (req, res) => {
    let filteredList = applyFilters(req.body);
    res.send(JSON.stringify({matchList: filteredList}));
};

module.exports = {
    applyFilters,
    match_filtered_list
};
