var express = require('express');
var router = express.Router();

/* GET building data. */
router.get('/', function(req, res, next) {
    res.send({
        "action": `Get details of the building ${req.params.bldid}`,
        "key": "value"
      });    
});

module.exports = router;
