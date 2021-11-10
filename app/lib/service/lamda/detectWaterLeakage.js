const AWS = require('aws-sdk');
AWS.config.region = process.env.AWS_REGION;
    
function getStandardDeviation(events) {
    let diffs = [];
    
    for (let i = 1; i < events.length; i++) {
        diffs.push(Math.abs(events[i].volume - events[i-1].volume));
    }
    
    const mean = (diffs.reduce((prev, curr) => prev + curr)/diffs.length);
    const stdv = Math.sqrt((diffs
                            .map(diff => (diff - mean)**2)
                            .reduce((p,c) => p+c))/(diffs.length));
    
    return {
        'mean': mean,
        'deviation': stdv,
        'fromTimestamp': events[0].timestamp,
        'toTimestamp': events[events.length - 1].timestamp
    }
}

async function sendNotification(thingName, stdDv) {
    const sns = new AWS.SNS();
    
    return new Promise((resolve, reject) => {
        console.log('Sending notification ...');

        sns.publish({
            TopicArn: process.env.SNS_ALERT_TOPIC_PREFIX + thingName,
            Message: JSON.stringify(stdDv)
        }, (err, data) => {
           if (err) {
               reject(err);
               return;
           }
           
           console.log('Successfully sent the notification');
           resolve(data);
        });
    });
}

async function insertAlert(thingName, stdDv) {
    console.log(`Inserting alert for thing ${thingName}`);
    
    const client = new AWS.DynamoDB();

    return new Promise((resolve, reject) => {
        client.putItem({
            TableName: 'ThingsAlerts',
            Item: {
                'ThingName': { S: thingName },
                'Timestamp': { N: '' + Date.now() },
                'Alert': {
                    M: {'type': {S: 'Leakage'},
                        'severity': {S: 'High'},
                        'data': {S: JSON.stringify(stdDv)}
                    }
                }
            }
        }, (error, data) => {
            if (error) {
                console.log(error);
                
                reject(error);
                return;
            }
            
            console.log('Successfully inserted alert');
            resolve();
        });
    });
}

async function thingLeaks(thingName, state) {
    return new Promise((resolve, reject) => {
        let lastStateValue = state[thingName];
    
        if (!lastStateValue) {
            console.log('There was no data to reduce!');
            
            resolve();
            return;
        }
        
        console.log(`Events to process: ${lastStateValue}`);
        lastStateValue = JSON.parse(lastStateValue);

        if (lastStateValue.length <= 5) {
            console.log('There are less than 5 events to process, skipping leak check!');
            
            resolve();
            return;
        }
        
        const stdDv = getStandardDeviation(lastStateValue);
        console.log(stdDv);
    
        if (stdDv.mean > 3 && stdDv.deviation <= 1) {
            console.log('Leakage detected!');
            resolve(stdDv);
    
        } else {
            console.log('No leakage detected');
            resolve();
        }
    });
}

function extractAndAppendEventToState(event, state) {
    event.Records.forEach(record => {
        const thingName = record.kinesis.partitionKey;
        
        let lastStateValue = state[thingName];
    
        if (!lastStateValue) {
            lastStateValue = [];
        } else {
            lastStateValue = JSON.parse(lastStateValue);
        }
        
        const eventData = Buffer.from(record.kinesis.data, 'base64')
                                .toString('ascii');
        lastStateValue.push(JSON.parse(eventData));
    
        state[thingName] = JSON.stringify(lastStateValue);
    });
}

exports.handler = async (event, context) => {
    return new Promise((resolve, reject) => {
        let state = { ...event.state }

        if (event.isFinalInvokeForWindow) {
            console.log('Destination invoke');
            
            try {
                Object.keys(state).forEach(thingName => {
                    thingLeaks(thingName, state).then(stdDv => {
                        if (!stdDv) {
                            console.log('No action to take');
                            
                            resolve();
                            return;
                        }
                        
                        insertAlert(thingName, stdDv).then(() => {
                            sendNotification(thingName, stdDv).then(() => {
                                resolve();    
                            }, (err) => {
                              reject(err);
                            })
                        }, (err) => {
                            reject(err)
                        })                        
                    }, error => {
                        reject(error);
                    });
                });
            } catch (err) {
                reject(err);
            }
        } else {
            console.log('Aggregate invoke');
            
            extractAndAppendEventToState(event, state);
        
            console.log('Returning state: ', state)
            resolve({
                state: state,
            });
        }
    });
};
