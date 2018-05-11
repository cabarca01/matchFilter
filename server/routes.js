'use strict';

const express = require('express');

// require controllers
const matchController = require('./../controllers/matchController');
const indexController = require('./../controllers/indexController');

let router = express.Router();

router.get('/', indexController.index);
router.post('/filter', matchController.match_filtered_list);

module.exports = router;
