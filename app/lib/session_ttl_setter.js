const { StatusCodes } = require('http-status-codes');
const client = require('./dbclient');

module.exports = function(options) {
    var ttlChecked = false;

    async function enableTTLIfRequired() {
        if (ttlChecked) return;
    
        client.describeTimeToLive({
            TableName: 'TenantsSessions'
        }, (error, data) => {
            ttlChecked = true;
    
            if (error) {
                console.log('Error checking if TTL is enabled for TenantsSessions table or not!');
                return;
            }
    
            const status = data.TimeToLiveDescription.TimeToLiveStatus;
            if (status !== 'ENABLING' && status !== 'ENABLED') {
                client.updateTimeToLive({
                    TableName: 'TenantsSessions',
                    TimeToLiveSpecification: {
                        AttributeName: 'expires',
                        Enabled: true
                    }
                }, (error, data) => {
                    if (error) {
                        console.log('Error enabling ttl for expiry field in TenantsSessions table!');
                    }
                })
            }
        });
    }

    enableTTLIfRequired();
}