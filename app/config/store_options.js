var sessionsStoreConfig = {
    table: 'TenantsSessions',
    AWSConfigJSON: {
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY        
    },
    specialKeys: [
        {
            name: 'tenantUuid',
            type: 'S'
        }
    ]
}

module.exports = sessionsStoreConfig;