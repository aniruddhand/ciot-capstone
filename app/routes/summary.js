var express = require('express');
var router = express.Router();

/* GET tenant summary. */
router.get('/', function(req, res, next) {
    res.send({
        "message": `Welcome ${req.session.tenantUuid}`
    });
});

module.exports = router;
