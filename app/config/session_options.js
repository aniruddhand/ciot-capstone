var sessionOptions = {
    cookie: {
        httpOnly: true,
        maxAge: 60000
    },
    name: 'TenantSessionCookie',
    saveUninitialized: false,
    secret: '2020ciot-wma',
    unset: 'destroy',
    saveUninitialized: false,
    resave: false,
    rolling: true
}

module.exports = sessionOptions;