var express = require('express');
var router = express.Router();

/* GET alerts data. */
router.get('/', function(req, res, next) {
    res.render("login")
});

module.exports = router;
