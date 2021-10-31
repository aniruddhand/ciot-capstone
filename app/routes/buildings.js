var express = require('express');
var router = express.Router();

/* GET dashboard data */
var express = require('express');
var router = express.Router();

/* GET apartments data. */
router.get('/', function(req, res, next) {
  res.send({
    "action": `Get list of all the buildings of the tenant ${req.session.tenantId}`,
    "key": "value"
  });
});

router.post('/', function(res, res, next) {
  res.send({
    "action": `Add new building for the tenant ${req.session.tenantId}`,
    "key": "value"
  });
});

router.put('/', function(res, res, next) {
  res.send({
    "action": `Update building ${req.params.bldid} of the tenant ${req.session.tenantId}`,
    "key": "value"
  });
});

router.delete('/', function(res, res, next) {
  res.send({
    "action": `Remove building ${req.params.bldid} from the tenant ${req.session.tenantId}`,
    "key": "value"
  });
});

module.exports = router;