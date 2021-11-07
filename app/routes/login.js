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

    var hasErrors = false;
    const tenant = await authorizeTenant(req.body).catch(error => {
        hasErrors = error ? true : false;
        next(error);
        return;
    });

    if (hasErrors) {
        return;
    }

    if (tenant) {
        req.session.tenantUuid = tenant.uuid;
        req.session.email = tenant.email;
        req.session.fullName = tenant.fullName;
    }

    res.setHeader('Content-Type', 'application/json');
    res.json(tenant ? tenant : AuthorizationMessages.Unauthorized);
});

module.exports = router;