const { StatusCodes } = require('http-status-codes');

function getmsg(code, msg, status) {
    const msgObj = {
        status: status ? status : StatusCodes.BAD_REQUEST,
        stack: {
            code: code,
            msg: msg
        },
        toString: () => `${code}: ${msg}`
    }

    if (msgObj.status && msgObj.status < StatusCodes.BAD_REQUEST) {
        delete msgObj.status
    }

    return msgObj;
}

module.exports = {
    RegistrationValidationMessages: {
        NoTenantDetailsError: getmsg('VERR-NO-TENANT-DETAILS', 'Please provide tenant details.'),
        NoEmailAddressError: getmsg('VERR-NO-EMAIL', 'Please specify email address.'),
        InvalidEmailError: getmsg('VERR-INVALID-EMAIL', 'Invalid email address specified.'),
        NoCellDetailsError: getmsg('VERR-NO-CELL-PHONE', 'Please provide a valid cell phone number.'),
        InvalidNumberError: getmsg('VERR-INVALID-CELL-PHONE', 'Invalid cell phone number specified.'),
        TenantAlreadyExistsError: getmsg('VERR-ALREADY-REG', 'The provided email address is already registered with us.'),
        InvalidPinError: getmsg('VERR-INVALID-PIN', 'Please provide a valid 4 digit pin.')
    },
    LoginValidationMessages: {
        InvalidEmailError: getmsg('VERR-INVALID-EMAIL', 'Invalid email address specified.'),
        InvalidPinError: getmsg('VERR-INVALID-PIN', 'Invalid pin specified.')
    },
    AuthorizationMessages: {
        Authorized: getmsg('OK', 'Successfully authorized.', StatusCodes.OK),
        Unauthorized: getmsg('CERR-INVALID-PINE', 'Invalid pin. Please enter your 4 digit pin and try again.'),
        NotLoggedIn: getmsg('VINFO-NO-SESSION', 'You are not logged in.', StatusCodes.OK),
        LoggedOut: getmsg('OK', 'Successfully logged out.', StatusCodes.OK)
    },
    RuntimeMessages: {
        NoSuchTenant: getmsg('RTERR-NO-SUCH-TENANT', 'There is no user with provided email address.'),
        ErrorFetchingFleetTimeseries: getmsg('RTERR-TS-FETCH-FAILED', 'Could not fetch fleet timeseries.', StatusCodes.INTERNAL_SERVER_ERROR),
        ErrorFetchingAlertItems: getmsg('RTERR-ALERTS-FETCH-FAILED', 'Could not fetch alerts.', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}