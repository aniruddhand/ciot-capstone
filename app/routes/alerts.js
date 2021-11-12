var express = require('express');
const { getFleetActiveAlerts, getFleetAlertsHistory } = require('../lib/service/fleet/alerts');
var router = express.Router();

/* GET alerts data. */
router.get('/active', function(req, res, next) {
  const thingNames = req.query.thingNames;
  getFleetActiveAlerts(thingNames).then(alerts => {
    res.json(alerts);
  }, error => {
    next(error);
  })
});

router.get('/history', function(req, res, next) {
  const thingNames = req.query.thingNames;
  getFleetAlertsHistory(thingNames).then(alerts => {
    res.json(alerts);
  }, error => {
    next(error);
  })
});

module.exports = router;