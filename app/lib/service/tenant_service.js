const { buildGetTenantCommand, buildPutTenantCommand, buildQueryTenantAuthCommand } = require('../util/tenant_commands');
const { validateLogin } = require('./validator/login_validator');
const { validateGetTenant, validatePutTenant } = require('./validator/tenant_validator');

const client = require('../dbclient');

async function getTenant(tenant) {
    validateGetTenant(tenant);
    return await client.getItem(buildGetTenantCommand(tenant));
}

async function createTenant(tenant) {
    await validatePutTenant(tenant);

    return new Promise((resolve, reject) => {
        client.transactWriteItems(buildPutTenantCommand(tenant), (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            resolve({
                "code": "0",
                "message": "Successfully created the tenant."
            });
        });
    });
}

async function authorizeTenant(tenant) {
    return new Promise((resolve, reject) => {
        validateLogin(tenant);

        client.getItem(buildGetTenantCommand(tenant), (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            if (data && data.Item) {
                tenant.uuid = data.Item.UUID.S;
                client.query(buildQueryTenantAuthCommand(tenant), (error, data) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    resolve(data && data.Items 
                        && data.Items.length == 1 && data.Items[0].Pin
                        && data.Items[0].Pin.B.toString() === tenant.pin ? tenant.uuid : undefined);
                });
            }
        });
    });
}

module.exports = {
    getTenant: getTenant,
    authorizeTenant: authorizeTenant,
    createTenant: createTenant
}