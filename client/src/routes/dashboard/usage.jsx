import { useEffect, useState } from "react"
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

export default function UsagePage() {
  const [fleetTimeseries, setFleetTimeseries] = useState();

  useEffect(() => {
    if (fleetTimeseries) {
      return;
    }

    const cachedTimeseries = sessionStorage.getItem('fleetUsage');
    if (cachedTimeseries) {
      setFleetTimeseries(JSON.parse(cachedTimeseries));
      return;
    }

    const fleetStatus = JSON.parse(sessionStorage.getItem('fleetStatus'));

    const now = Date.now();
    const date = new Date(now);

    const fromTimestamp = (now - date.getHours()*60*60*1000 - date.getMinutes()*60*1000 - date.getSeconds()*1000);
    const toTimestamp = (fromTimestamp + 23*60*60*1000 + 59*60*1000 + 59*1000);

    const body = {
      wlGWThingName: fleetStatus.wlgw.thingName,
      slGWThingName: fleetStatus.slgw.thingName,
      fromTimestamp: fromTimestamp,
      toTimestamp: toTimestamp
    }

    fetch('/api/timeseries/usage', {method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}})
      .then(response => {
        if (response.status === 200) {
          response.json().then(timeseries => {
            if (timeseries.wlgw && timeseries.wlgw.length) {
              timeseries.wlgw.forEach(data => {
                const epoch = new Date(data.timestamp);
                data.datetime = epoch.getHours() + ":" + epoch.getMinutes() + ' ' + (epoch.getHours() < 12 ? 'am' : 'pm')
              })
            }
            setFleetTimeseries(timeseries);
            sessionStorage.setItem('fleetUsage', JSON.stringify(timeseries));
          });
        }
      });
  }, [fleetTimeseries]);

  return (
    <div>
      <h3>Usage</h3>
      <p className='fw-normal'>This page shows water levels in today's time period.</p>
      {!fleetTimeseries &&
        <div className='d-flex justify-content-center'>
            <div className='spinner-border m-5' role='status' style={{ width: '3rem', height: '3rem' }}></div>
        </div>}
      {fleetTimeseries &&
      <LineChart width={900} height={400} data={fleetTimeseries.wlgw}>
        <Line type="monotone" dataKey="volume" stroke="#ff7300" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
        <XAxis dataKey="datetime" />
        <YAxis />
        <Tooltip />
      </LineChart>
      }
    </div>
  )
}