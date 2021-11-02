const { RegistrationValidationMessages } = require('../../../config/messages');
const client = require('../../dbclient');
const { matchesEmailPattern, isValidPin, isValidCellNumber } = require('../../util/common-utils');
const { buildGetTenantCommand } = require('../../util/tenant_commands');

function validateGetTenant(tenant) {
    if (!tenant) {
        throw RegistrationValidationMessages.NoTenantDetailsError;
    }

    if (!tenant.email) {
        throw RegistrationValidationMessages.NoEmailAddressError;
    }

    if (!matchesEmailPattern(tenant.email)) {
        throw RegistrationValidationMessages.InvalidEmailError;
    }
}

async function validatePutTenant(tenant) {
    if (!tenant) {
        throw RegistrationValidationMessages.NoTenantDetailsError;
    }

    if (!tenant.email) {
        throw RegistrationValidationMessages.NoEmailAddressError;
    }

    if (!matchesEmailPattern(tenant.email)) {
        throw RegistrationValidationMessages.InvalidEmailError;
    }

    if (!isValidCellNumber(tenant.cellPhone)) {
        throw RegistrationValidationMessages.InvalidNumberError;
    }

    if (!isValidPin(tenant.pin)) {
        throw RegistrationValidationMessages.InvalidPinError;
    }

    return new Promise((resolve, reject) => {
        client.getItem(buildGetTenantCommand(tenant), (error, data) => {
            if (error) {
                reject({
                    status: 500,
                    stack: error
                });
            }

            if (data != null && data.Item && data.Item.Email) {
                reject(RegistrationValidationMessages.TenantAlreadyExistsError);
            }

            resolve(undefined);
        });
    })
}

module.exports = {
    validatePutTenant: validatePutTenant,
    validateGetTenant: validateGetTenant
}