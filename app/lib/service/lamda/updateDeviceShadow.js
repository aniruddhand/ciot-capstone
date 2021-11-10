const AWS = require('aws-sdk');

AWS.config.region = process.env.AWS_REGION

const iotData = new AWS.IotData({
    endpoint: process.env.MQTT_BROKER_ENDPOINT,
    accessKeyId: process.env.DEVICE_SHADOW_ACCESS_KEY,
    secretAccessKey: process.env.DEVICE_SHADOW_SECRET_KEY
});

async function updateWLGWDeviceShadow(event) {
    return new Promise((resolve, reject) => {
        var params = {
          payload: `{"state":{"desired":{"volume": ${event.volume},"timestamp": ${event.timestamp}}}}`,
          thingName: event.thingName
        }
  
        iotData.updateThingShadow(params, (err, data) => {
          if (err) {
            console.log(err, err.stack)
            reject(err);

          } else {
            console.log(`Update thing shadow response: ${JSON.stringify(data)}`);
            resolve(data);
          }
        });
    });
}

exports.handler = async (event) => {
  return updateWLGWDeviceShadow(event);
};
