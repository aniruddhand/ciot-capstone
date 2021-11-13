const awsIotDevice = require('aws-iot-device-sdk');
const { RuntimeMessages } = require('../../../config/messages');

const slgwDevice = new awsIotDevice.device({
  region: process.env.AWS_REGION,
  certPath: 'certs/certificate.pem.crt',
  keyPath:'certs/private.pem.key',
  caPath:'certs/RootCA.pem.crt',
  debug: true,
  keepalive: 1200,
  offlineQueueing: false,
  host: process.env.AWS_MQTT_BROKER_ENDPOINT
});

async function setPumpStatus(status) {
  return new Promise((resolve, reject) => {
    slgwDevice.publish('devices/slgtw2020ciotBb/pump/status', JSON.stringify({'status': status}), () => {
      resolve();
    });
  });
}

module.exports = {
  setPumpStatus: setPumpStatus
}