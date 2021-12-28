const moment = require('moment');
const express = require('express');
const router = express.Router();

// const api = require('./api');
// router.use('/api', api);

router.get('/', async function (req, res, next) {
    const date = moment.utc().format();

    await res.json({ time: moment.utc(date).local(), msg: '6.1 message' });
});

router.post('/data', async function (req, res, next) {
    const date = moment.utc().format();

    const data = req.body;
    if(data["@type"] === "http://trinidata.ru/sigma/ОбъектЭнергоснабжения"){
        
    }

    await res.json({ time: moment.utc(date).local(), type: data["@type"], msg: '6.1 message' });
});

module.exports = router;