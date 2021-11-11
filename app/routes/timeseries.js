const { ConsumptionBracket, HousholdEconomicSection } = require('../models/timeseries_profile');

var express = require('express');
const { synthesizeWaterTankTimeseries: synthesizeTimeseries } = require('../lib/service/simulate/synthetic_timeseries_service');
const { getFleetTimeseries } = require('../lib/service/usage/timeseries_service');
const { StatusCodes } = require('http-status-codes');
const { getTodaysEpochRange } = require('../lib/util/common-utils');
var router = express.Router();

// Sample profile
const familyProfile = {
    dayStartsBtw: [1635984000000, 1635987600000],
    getsReadyBtw: [1635991200000, 1636000200000],
    foodIsCookedBtw: [[1635991200000, 1635994800000], [1636000200000, 1636007400000]],
    breaksfastsBtw: [1635996600000, 1635998400000],
    lunchBtw: [1635969600000, 1635973200000],
    houseIsCleanedBtw: [1635994800000, 1636000200000],
    washClothsBtw: [1635991200000, 1636000200000],
    utensilsAreWashedBtw: [[1636021800000, 1636024500000]],
    dinesBtw: [1635994800000, 1635998400000],
    dayEndsBtw: [1636045200000, 1636003800000],
    members: [{
        age: 89,
        paConsumptionBracket: ConsumptionBracket.Btw100To135
    }, {
        age: 79,
        paConsumptionBracket: ConsumptionBracket.Btw75To100
    }, {
        age: 65,
        paConsumptionBracket: ConsumptionBracket.Btw75To100
    }, {
        age: 41,
        paConsumptionBracket: ConsumptionBracket.Btw75To100
    }, { 
        age: 39,
        paConsumptionBracket: ConsumptionBracket.Btw75To100
    }, {
        age: 13,
        paConsumptionBracket: ConsumptionBracket.Btw100To135
    }, {
        age: 8,
        dayStartsBtw: [1635989400000, 1635993000000],
        paConsumptionBracket: ConsumptionBracket.Btw100To135,
        opensTapBtw: [1636021800000, 1636022400000]
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