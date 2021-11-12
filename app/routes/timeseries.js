const { ConsumptionBracket, HousholdEconomicSection } = require('../models/timeseries_profile');

var express = require('express');
const { synthesizeWaterTankTimeseries: synthesizeTimeseries } = require('../lib/service/simulate/synthetic_timeseries_service');
const { getFleetTimeseries } = require('../lib/service/usage/timeseries_service');
const { StatusCodes } = require('http-status-codes');
const { getTodaysEpochRange } = require('../lib/util/common-utils');
var router = express.Router();

// Sample profile
const familyProfile = {
    dayStartsBtw: ['6:30', '7:30'],
    dayEndsBtw: ['22:00', '22:30'],
    foodIsCookedBtw: [['7:30', '9:00'], ['11:00', '12:30']],
    lunchBtw: ['13:30', '14:15'],
    houseIsCleanedBtw: ['08:00', '11:00'],
    washClothsBtw: ['08:00', '10:00'],
    utensilsAreWashedBtw: [['16:00', '16:30']],
    dinesBtw: ['20:15', '20:45'],
    members: [{
        age: 89,
        getsReadyBtw: ['8:00', '8:30'],
        dayEndsBtw: ['22:30', '23:00'],
        breaksfastsBtw: ['9:00', '9:15'],
        paConsumptionBracket: ConsumptionBracket.Btw100To135
    }, {
        age: 79,
        dayStartsBtw: ['5:30', '6:0'],
        getsReadyBtw: ['9:0', '9:45'],
        breaksfastsBtw: ['09:45', '10:00'],
        paConsumptionBracket: ConsumptionBracket.Btw75To100
    }, {
        age: 65,
        getsReadyBtw: ['8:45', '9:15'],
        breaksfastsBtw: ['10:00', '10:30'],
        paConsumptionBracket: ConsumptionBracket.Btw75To100
    }, {
        age: 41,
        getsReadyBtw: ['8:00', '8:30'],
        breaksfastsBtw: ['9:30', '9:45'],
        dayEndsBtw: ['22:45', '23:00'],
        paConsumptionBracket: ConsumptionBracket.Btw75To100
    }, { 
        age: 39,
        getsReadyBtw: ['9:00', '9:45'],
        breaksfastsBtw: ['09:45', '10:00'],
        dayEndsBtw: ['10:45', '11:30'],
        paConsumptionBracket: ConsumptionBracket.Btw75To100
    }, {
        age: 13,
        getsReadyBtw: ['8:00', '8:30'],
        breaksfastsBtw: ['09:00', '09:45'],
        paConsumptionBracket: ConsumptionBracket.Btw100To135
    }, {
        age: 8,
        dayStartsBtw: ['7:00', '7:30'],
        getsReadyBtw: ['10:00', '10:30'],
        breaksfastsBtw: ['10:45', '10:55'],
        dayEndsBtw: ['22:45', '23:00'],
        paConsumptionBracket: ConsumptionBracket.Btw100To135,
        opensTapBtw: ['23:00', '23:45']
    }],
    economicSection:HousholdEconomicSection.SECA
}

router.get('/synthetic', function(req, res, next) {
    const [begin] = getTodaysEpochRange();

    res.setHeader('Content-disposition', 'attachment; filename=data.json');
    res.set('Content-Type', 'application/json');
    res.send(synthesizeTimeseries('Thing_85a9c59a-c389-4d2c-9cbc-7a5b430eb5f2_WLGW',
                1635964200000,
                req.query.capacity ? req.query.capacity : 2000, familyProfile));
});

router.post('/usage', function(req, res, next) {
    let wlGWThingName = req.body.wlGWThingName;
    let slGWThingName = req.body.slGWThingName;
    let fromTimestamp = req.body.fromTimestamp;
    let toTimestamp = req.body.toTimestamp;

    getFleetTimeseries(wlGWThingName, slGWThingName, fromTimestamp, toTimestamp).then(timeseries => {
        res.json(timeseries);
    }, error => {
        next(error);
    });
});

module.exports = router;