const client = require('./dbclient');

module.exports = function(options) {
    var ttlChecked = false;

    async function checkIfTenantsSessionsExists(count) {
        console.log('Checking if TenantsSessions table exists to enable TTL ...');

        return new Promise((resolve, reject) => {
            client.describeTable({
                TableName: 'TenantsSessions'
            }, (error, info) => {
                if (error || info.Table.TableStatus === 'CREATING') {
                    console.log('Table is still getting created, will try again after 5 seconds ... ');

                    if (count < 5) {
                        setTimeout(() => {
                            checkIfTenantsSessionsExists(++count).then(() => { resolve() }, () => {
                                checkIfTenantsSessionsExists().then(() => { resolve() }, () => { reject() });                        
                            }).catch(() => { reject() });
                        }, 5000);
                    } else {
                        reject();
                    }
                } else if (info.Table.TableStatus === 'ACTIVE') {
                    resolve();
                } else {
                    reject(`Unhandled table status: ${info.Table.TableStatus}`);
                }
            });
        });
    }

    async function enableTTLIfRequired() {
        if (ttlChecked) return;

        let successful = true;
        await checkIfTenantsSessionsExists(0).catch((error) => { console.log(error); successful = false });
        
        if (!successful) {
            return;
        }

        console.log('Checking if TTL is enabled on TenantsSessions table ... ');

        client.describeTimeToLive({
            TableName: 'TenantsSessions'
        }, (error, data) => {
            ttlChecked = true;
    
            if (error) {
                console.log(error);
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
                        console.log(error);
                    } else {
                        console.log('Successfully updated TTL on TenantsSessions table!');
                    }
                })
            } else {
                console.log('TTL is already enabled on TenantSessions table, good to go ...');
            }
        });
    }

    enableTTLIfRequired();
}