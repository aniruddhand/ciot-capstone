const { RuntimeMessages } = require("../../../config/messages");
const client = require("../../dbclient")

async function getFleetAlerts(thingName) {
  return new Promise((resolve, reject) =>{
    client.executeStatement({
      'Statement': `SELECT "ThingName", "Timestamp", "Alert" FROM "ThingsAlerts" WHERE "ThingName" = '${thingName}' ORDER BY "Timestamp" ASC`
    }, (err, data) => {
      if (err) {
        console.log(err);

        reject(RuntimeMessages.ErrorFetchingAlertItems);
        return;
      }

      const alerts = [];
      if (data.Items && data.Items.length) {
        data.Items.forEach(item => {
          alerts.push({
            timestamp: Number.parseInt(item.Timestamp.N),
            serverity: item.Alert.M.severity.S,
            type: item.Alert.M.type.S,
            data: JSON.parse(item.Alert.M.data.S)
          });
        });

        resolve(alerts);
      }
    });
  });
}

module.exports = {
  getFleetAlerts: getFleetAlerts
}