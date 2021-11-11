
const messages = require('../../../config/messages');
const { buildWLGWUsageTimeseriesCommand, buildSLGWUsageTimeseriesCommand } = require('../../util/fleet_commands');
const client = require('../../dbclient');

async function getFleetTimeseries(wlGWThingName, slGWThingName, fromTimestamp, toTimestamp) {
  return new Promise((resolve, reject) => {
    const wlgwCommand = buildWLGWUsageTimeseriesCommand(wlGWThingName, fromTimestamp, toTimestamp);
    const slgwCommand = buildSLGWUsageTimeseriesCommand(slGWThingName, fromTimestamp, toTimestamp);
    
    const promises = [];
    const timeseries = {'wlgw': [], 'slgw': []};

    promises.push(new Promise((resolve, reject) => {
      client.executeStatement(wlgwCommand, (err, data) => {
        if (err) {
          console.log(err);

          reject(messages.RuntimeMessages.ErrorFetchingFleetTimeseries);
          return;
        }

        if (data.Items) {
          data.Items.forEach(item => {
              timeseries.wlgw.push({'timestamp': Number.parseInt(item.timestamp.N), 'volume': Number.parseInt(item.volume.N)});
          });
        }

        resolve();
      })
    }));

    promises.push(new Promise((resolve, reject) => {
      client.executeStatement(slgwCommand, (err, data) => {
        if (err) {
          console.log(err);

          reject(messages.RuntimeMessages.ErrorFetchingFleetTimeseries);
          return;
        }

        if (data.Items) {
          data.Items.forEach(item => {
              timeseries.slgw.push({'timestamp': Number.parseInt(item.timestamp.N), 'volume': Number.parseInt(item.volume.N)});
          });
        }

        resolve();
      })
    }));

    Promise.all(promises).then(fulfilled => {
      resolve(timeseries)
    }, error => {
      reject(error);
    });
})
}

module.exports = {
  getFleetTimeseries: getFleetTimeseries
}