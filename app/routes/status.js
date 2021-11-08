const { getTenant } = require('../lib/service/tenant_service');
const { getFleetStatus } = require('../lib/service/fleet/fleet_service');

var express = require('express');
const { StatusCodes } = require('http-status-codes');
var router = express.Router();

router.get('/', async function(req, res, next) {
  let err;
  const tenant = await getTenant({ 'email': req.session.email }).catch(error => err = error);

  if (err) {
    next(err);
    return;
  }

  getFleetStatus(tenant).then(onfulfilled => {
    res.json(onfulfilled);

  }, onrejected => {
    const error = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      stack: onrejected
    }

    next(error);
  }).catch(ex => {
    const error = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      stack: ex
    }

    next(error);
  });
});

module.exports = router;
