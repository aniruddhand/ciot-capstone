var express = require('express');
var router = express.Router();

const { AuthorizationMessages } = require('../config/messages');

/* Logout tenant. */
router.post('/', async function(req, res, next) {
    if (!req.session.tenantUuid) {
        res.json(AuthorizationMessages.NotLoggedIn);
        return;
    }

    req.session.destroy();

    res.json(AuthorizationMessages.LoggedOut);
});

module.exports = router;
