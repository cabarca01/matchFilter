'use strict';

require('./config/config');

const app = require('./app');

if (!module.parent) {
    app.listen(process.env.PORT, () => {
        console.log(`Node Server running on port ${process.env.PORT}.`);
    });
}

module.exports = {app}