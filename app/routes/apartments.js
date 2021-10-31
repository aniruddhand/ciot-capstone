var express = require('express');
var router = express.Router();

/* GET apartments data. */
router.get('/', function(req, res, next) {
  res.send({
    "action": `Get apartments of the building ${req.params.bldid}`,
    "key": "value"
  });
});

router.post('/', function(res, res, next) {
  res.send({
    "action": `Add new apartment to the building ${req.params.bldid}`,
    "key": "value"
  });
});

router.put('/', function(res, res, next) {
  res.send({
    "action": `Update apartment of the building ${req.params.bldid}`,
    "key": "value"
  });
});

router.delete('/', function(res, res, next) {
  res.send({
    "action": `Remove apartment from the building ${req.params.bldid}`,
    "key": "value"
  });
});

module.exports = router;
