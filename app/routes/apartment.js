var express = require('express');
var router = express.Router();

/* GET apartment data. */
router.get('/', function(req, res, next) {
  res.send({
    "action": `Get details of apartment ${req.params.aptid} in the building ${req.params.bldid}`,
    "key": "value"
  });
});

module.exports = router;
