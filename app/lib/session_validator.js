const { StatusCodes } = require('http-status-codes');

const ignorePaths = ['/login', '/logout', '/register', '/timeseries/synthetic'];

function sessionNotActive(req) {
    return (req.session && !req.session.tenantUuid);
}

function pathRequiresAuth(req) {
    return !ignorePaths.find(path => req.url.startsWith(path));
}

module.exports = function(options) {
    return function(req, res, next) {
        if (pathRequiresAuth(req) && sessionNotActive(req)) {
            res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized access.');
            return;
        }

        next();
    }
}