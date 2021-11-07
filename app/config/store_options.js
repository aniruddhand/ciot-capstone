var sessionsStoreConfig = {
    table: 'TenantsSessions',
    AWSConfigJSON: {
        region: process.env.AWS_REGION,
        accessKeyId: process.env.SESSIONS_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.SESSIONS_AWS_SECRET_ACCESS_KEY        
    },
    specialKeys: [
        {
            name: 'tenantUuid',
            type: 'S'
        }
    ]
}

if (process.env.ENV === 'dev') {
    sessionsStoreConfig.AWSConfigJSON.endpoint = process.env.ENDPOINT;
}

module.exports = sessionsStoreConfig;