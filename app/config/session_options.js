var sessionOptions = {
    cookie: {
        httpOnly: true,
        maxAge: 60000,
        rolling: true,
        saveUninitialized: false,
    },
    name: 'TenantSessionCookie',
    saveUninitialized: false,
    secret: '2020ciot-wma',
    unset: 'destroy'
}

module.exports = sessionOptions;