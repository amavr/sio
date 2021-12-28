const moment = require('moment');
const express = require('express');
const router = express.Router();

const api_61 = require('./06-1');
router.use('/6-1', api_61);

router.get('/', async function (req, res, next) {
    const date = moment.utc().format();

    await res.json({ time: moment.utc(date).local(), msg: 'I`m alive' });
});

module.exports = router;