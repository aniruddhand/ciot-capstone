var getAWSConfig = require('./aws_config');

var sessionsStoreConfig = {
    table: 'TenantsSessions',
    AWSConfigJSON: getAWSConfig(),
    specialKeys: [
        {
            name: 'tenantUuid',
            type: 'S'
        }
    ],
    readCapacityUnits: 10,
    writeCapacityUnits: 5
}

module.exports = sessionsStoreConfig;