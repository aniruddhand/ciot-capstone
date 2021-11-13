var express = require('express');
const { RuntimeMessages } = require('../config/messages');
var router = express.Router();

const fleetcontrol_service = require('../lib/service/fleet/fleetcontrol_service');

/* Update fleet shadow */
router.post('/pump', function(req, res, next) {
  const pumpStatus = req.body.status;

  fleetcontrol_service.setPumpStatus(pumpStatus)
    .then(() => {
      (res.json(RuntimeMessages.SucessfullyUpdatedPumpStatus));
    }, error => {
      next(error);
    }).catch(error => {
      next(error);
    })
});

module.exports = router;
