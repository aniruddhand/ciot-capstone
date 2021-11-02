var { authorizeTenant } = require('../lib/service/tenant_service');

var express = require('express');
const { AuthorizationMessages } = require('../config/messages');
var router = express.Router();

/* Login tenant. */
router.post('/', async function(req, res, next) {
    if (req.session.tenantUuid) {
        res.redirect('/');
        return;
    }

    const tenantUuid = await authorizeTenant(req.body).catch(error => {
        next(error);
        return;
    });

    if (tenantUuid) {
        req.session.tenantUuid = tenantUuid;
    }

    res.json(tenantUuid ? 
        AuthorizationMessages.Authorized
        : AuthorizationMessages.Unauthorized);
});

module.exports = router;
