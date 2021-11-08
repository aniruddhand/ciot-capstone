const AWS = require('aws-sdk');
const iotConfig = {
  endpoint: process.env.AWS_IOT_ENDPOINT,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
}

const iotDataConfig = { ...iotConfig, endpoint: process.env.AWS_MQTT_BROKER_ENDPOINT }

AWS.config.region = process.env.AWS_REGION

const iot = new AWS.Iot(iotConfig);
const iotData = new AWS.IotData(iotDataConfig);

async function getFleetStatus(tenant) {
  return new Promise((resolve, reject) => {
    iot.listThingsInThingGroup({'thingGroupName': `ThingGroup_Package_${tenant.packageUuid}`, recursive: true}, (err, group) => {
      if (err) {
        reject(err);
        return;
      }

      const things = group.things;
      
      if (things && things.length) {
        const fleetStatus = {};

        const allPromises = [];
        
        things.forEach(thingName => {
          allPromises.push(new Promise((resolve, reject) => {
            let lastMessage = null;
          
            iotData.getThingShadow({thingName: thingName}, (err, shadow) => {
              if (err) {
                reject(err);
                return;
              }
  
              if (shadow.payload) {
                lastMessage = JSON.parse(shadow.payload).state.delta;
              }

              if (thingName.endsWith('WLGW')) {
                fleetStatus.wlgw = lastMessage;
              } else {
                fleetStatus.slgw = lastMessage;
              }

              resolve();
            });
          }));
        });

        Promise.all(allPromises).then(() => {
          resolve(fleetStatus);
        }, (err) => {
          reject(err)
        });
      }
    });
  });
}

module.exports = {
  getFleetStatus: getFleetStatus
}