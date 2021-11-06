const { response } = require('express');
var express = require('express');
var router = express.Router();

/* Get current session, if present. */
router.get('/', function(req, res, next) {
    res.send({
        'tenantUuid': req.session.tenantUuid,
        'email': req.session.email,
        'fullName': req.session.fullName
    });
});

module.exports = router;
