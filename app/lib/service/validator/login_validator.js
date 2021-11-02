const { LoginValidationMessages } = require('../../../config/messages');
const { matchesEmailPattern, isValidPin } = require('../../util/common-utils');

async function validateLogin(loginData) {
    if (!matchesEmailPattern(loginData.email)) {
        throw LoginValidationMessages.InvalidEmailError;
    }

    if (!isValidPin(loginData.pin)) {
        throw LoginValidationMessages.InvalidPinError;
    }
}

module.exports = {
    validateLogin: validateLogin
}