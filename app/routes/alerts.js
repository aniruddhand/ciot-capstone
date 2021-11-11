var express = require('express');
const { getFleetAlerts } = require('../lib/service/fleet/alerts');
var router = express.Router();

/* GET alerts data. */
router.get('/', function(req, res, next) {
  const thingName = req.query.wlGWThingName;
  getFleetAlerts(thingName).then(alerts => {
    res.json(alerts);
  }, error => {
    next(error);
  })
});

module.exports = router;