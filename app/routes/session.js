const { response } = require('express');
var express = require('express');
var router = express.Router();

/* Get current session, if present. */
router.get('/', function(req, res, next) {
    res.send({
        "tenantId": req.session.id
    });
});

module.exports = router;
