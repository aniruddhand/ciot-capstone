const AWS = require('aws-sdk');
AWS.config.region = process.env.AWS_REGION;

const kinesis = new AWS.Kinesis({
   accessKeyId: process.env.KINESIS_AWS_ACCESS_KEY,
   secretAccessKey: process.env.KINESIS_AWS_SECRET_KEY
});

exports.handler = async (event) => {
    return new Promise((resolve, reject) => {
        const params = {
            StreamName: process.env.KINESIS_AWS_STREAM_NAME,
            PartitionKey: event.thingName,
            Data: JSON.stringify(event)
        }

        kinesis.putRecord(params, (error, data) => {
            if (error) {
                console.log('Error pushing event record to kinesis stream!');
                console.log(error);

                reject(error);
            } else {
                console.log('Successfully pushed the event to kinesis!');
                resolve(data);
            }
        });
    });
};
