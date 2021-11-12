const { RuntimeMessages } = require("../../../config/messages");
const client = require("../../dbclient");
const { getTodaysEpochRange } = require("../../util/common-utils");

async function getFleetAlertsHistory(thingNames) {
  const thingsList = thingNames
  .reduce((prev, current) => `'${prev}' '${current}' `)
  .trimRight()
  .replace(' ', ', ')

  const [fromTimestamp] = getTodaysEpochRange();
  const statement = `SELECT "ThingName", "Timestamp", "Alert"
                      FROM "ThingsAlerts"
                      WHERE "ThingName" IN [${thingsList}] AND "Timestamp" < ${fromTimestamp}
                      ORDER BY "ThingName", "Timestamp" ASC`
  
  return buildAlerts(statement);
}

async function getFleetActiveAlerts(thingNames) {
  const thingsList = thingNames
                      .reduce((prev, current) => `'${prev}' '${current}' `)
                      .trimRight()
                      .replace(' ', ', ');
  
  const [fromTimestamp] = getTodaysEpochRange();
  const statement = `SELECT "ThingName", "Timestamp", "Alert"
                      FROM "ThingsAlerts"
                      WHERE "ThingName" IN [${thingsList}] AND "Timestamp" >= ${fromTimestamp}
                      ORDER BY "ThingName", "Timestamp" ASC`
  return buildAlerts(statement);
}

async function buildAlerts(statement) {
  return new Promise((resolve, reject) =>{
    client.executeStatement({
      'Statement': statement
    }, (err, data) => {
      if (err) {
        console.log(err);

        reject(RuntimeMessages.ErrorFetchingAlertItems);
        return;
      }

      const wlgwAlerts = [];
      const slgwAlerts = [];

      let alerts;
      if (data.Items && data.Items.length) {
        data.Items.forEach(item => {
          alerts = item.ThingName.S.endsWith('_WLGW') ? wlgwAlerts : slgwAlerts;
          alerts.push({
            timestamp: Number.parseInt(item.Timestamp.N),
            serverity: item.Alert.M.severity.S,
            type: item.Alert.M.type.S,
            data: JSON.parse(item.Alert.M.data.S)
          });
        });
      }

      resolve({
        wlgw: wlgwAlerts,
        slgw: slgwAlerts
      });
    });
  });
}

module.exports = {
  getFleetActiveAlerts: getFleetActiveAlerts,
  getFleetAlertsHistory: getFleetAlertsHistory
}