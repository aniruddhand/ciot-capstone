function buildWLGWUsageTimeseriesCommand(thingName, fromTimestamp, toTimestamp) {
  const cmdPayload = {
    'Statement': `SELECT "timestamp", "volume" FROM "WLGWTimeseries" WHERE "thingName" = '${thingName}' ORDER BY "timestamp" ASC`
 }

  return cmdPayload;
}

function buildSLGWUsageTimeseriesCommand(thingName, fromTimestamp, toTimestamp) {
  const cmdPayload = {
    'Statement': `SELECT "timestamp", "volume" FROM "SLGWTimeseries" WHERE "thingName" = '${thingName}' ORDER BY "timestamp" ASC`
 }

  return cmdPayload;
}

module.exports = {
  buildWLGWUsageTimeseriesCommand: buildWLGWUsageTimeseriesCommand,
  buildSLGWUsageTimeseriesCommand: buildSLGWUsageTimeseriesCommand
}