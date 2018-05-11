'use strict';

const index = (req, res) => {
    let loggedUser = {
        display_name: 'Carlos',
        city: {
            name: 'London',
            latitude: 51.509865,
            longitude: -0.118092
        }
    };

    let filterLimits = {
        min_distance_limit: process.env.MIN_DIST_RANGE_KM,
        max_distance_limit: process.env.MAX_DIST_RANGE_KM,
        min_age_limit: process.env.MIN_AGE_RANGE,
        max_age_limit: process.env.MAX_AGE_RANGE,
        min_height_limit: process.env.MIN_HEIGHT,
        max_height_limit: process.env.MAX_HEIGHT
    };

    const pageTitle = 'Your Perfect Matches';

    res.render('index', {
        pageTitle,
        loggedUser,
        filterLimits
    });
};

module.exports = {
    index
};
