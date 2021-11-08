const { v4: uuidv4 } = require('uuid');

function buildGetTenantCommand(tenant) {
    const cmdPayload = {
        TableName: 'Tenants',
        Key: {
            'Email': {
                S: tenant.email
            }
        },
        ExpressionAttributeNames: {
            '#id': 'UUID'
        },
        ProjectionExpression: '#id, Email, FullName, PackageUUID'
    };

    return cmdPayload;
}

function buildPutTenantCommand(tenant) {
    const uuid = uuidv4();
    const cmdPayload = {
        TransactItems: [{
            Put: {
                TableName: 'Tenants',
                Item: {
                    'UUID': {
                        S: uuid
                    },
                    'Email': {
                        S: tenant.email
                    },
                    'CellPhone': {
                        N: tenant.cellPhone
                    },
                    'FullName': {
                        S: tenant.fullName
                    },
                    'PackageUUID': {
                        S: tenant.packageUuid
                    }
                }
            }
        }, {
            Put: {
                TableName: 'TenantsAuths',
                Item: {
                    'UUID': {
                        S: uuid
                    },
                    'Pin': {
                        B: tenant.pin
                    }
                }
            }
        }]
    };
    
    return cmdPayload;
}

function buildQueryTenantAuthCommand(tenant) {
    const cmdPayload = {
        TableName: 'TenantsAuths',
        KeyConditionExpression: '#id = :u',
        ExpressionAttributeNames: {
            '#id': 'UUID'
        },
        ExpressionAttributeValues: {
            ':u': {
                'S': tenant.uuid,
            }
        }
    };

    return cmdPayload;
}

module.exports = {
    buildGetTenantCommand: buildGetTenantCommand,
    buildPutTenantCommand: buildPutTenantCommand,
    buildQueryTenantAuthCommand: buildQueryTenantAuthCommand
}