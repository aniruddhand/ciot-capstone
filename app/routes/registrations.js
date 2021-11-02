var express = require('express');
var router = express.Router();

const tenantService = require('../lib/service/tenant_service');

/* Register a user. */
router.post('/', async function(req, res, next) {
    tenantService
        .createTenant(req.body)
        .then(tenant => res.json(tenant))
        .catch(err => next(err));
});

module.exports = router;
