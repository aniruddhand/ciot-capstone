import { useEffect, useState } from "react"

function getAlertMessage(alert) {
  switch (alert.type) {
    case 'Leakage':
      return ['Water flowed continuously!',
                  <span>Water was continuously flowing at the rate of <span className='fw-bold'>{alert.data.mean} ltr</span>
                  &nbsp;per minute between <span className='fw-bold'>{alert.data.timeRange}</span> on 
                  &nbsp;{new Date(alert.timestamp).toDateString()}</span>]
    default:
      return ['Attention']
  }
}

function getAlertCard(alert) {
  const [title, message] = getAlertMessage(alert);
  return (
    <div className="col-8">
      <div className='card mb-3 top-m-5'>
        <div className='row g-0 h-100'>
          <div className='col-md-4 bg-secondary'>
            <div className='img-fluid rounded-start d-flex align-items-center justify-content-center'>
              <i className='bi bi-droplet-half' style={{ fontSize: '07rem', color: 'cornflowerblue' }}></i>
            </div>
          </div>
          <div className='col-md-8'>
            <div className='card-body'>
              <h5 className='card-title'>{title}</h5>
              <p className='card-text'>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function enrichWithHumanReadableDate(alert) {
  const fromDate = new Date(alert.data.fromTimestamp);
  const toDate = new Date(alert.data.toTimestamp);

  const fromHours = fromDate.getHours();
  const fromMinutes = fromDate.getMinutes();
  const fromAm = (fromHours > 12 ? ' pm' : ' am');

  const toHours = toDate.getHours();
  const toMinutes = toDate.getMinutes();
  const toAm = (toHours > 12 ? ' pm' : ' am');

  alert.data.timeRange = `${fromHours}:${fromMinutes} ${fromAm} to ${toHours}:${toMinutes} ${toAm}`;
}

export default function NotificationsHistory() {
  const [alerts, setAlerts] = useState({wlgw: [], slgw: [], fetching: true});
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (fetched) {
      return;
    }

    const fleetStatus = JSON.parse(sessionStorage.getItem('fleetStatus'));

    const wlgwThingName = encodeURI(fleetStatus.wlgw.thingName);
    const slgwThingName = encodeURI(fleetStatus.slgw.thingName);

    fetch(`/api/alerts/history?thingNames=${wlgwThingName}&thingNames=${slgwThingName}`)
      .then(response => {
        if (response.status === 200) {
          setFetched(true);

          response.json().then(alerts => {
            alerts.fetching = false;

            if (alerts.wlgw) {
              alerts.wlgw.forEach(alert => enrichWithHumanReadableDate(alert));
            }

            if (alerts.slgw) {
              alerts.slgw.forEach(alert => enrichWithHumanReadableDate(alert));
            }

            setAlerts(alerts);
          });
        }
      });

  }, [alerts, fetched]);

  return (
    <div>
    <h3>Alerts History</h3>
      {alerts.fetching &&
        <div className='d-flex justify-content-center'>
            <div className='spinner-border m-5' role='status' style={{ width: '3rem', height: '3rem' }}></div>
        </div>}
      {!alerts.fetching && alerts.wlgw.length === 0 && alerts.slgw.length === 0 && <p className='fw-normal'>There are no alerts.</p>}
      {alerts.wlgw.length > 0 && <p className='fw-bold'>For Overhead Water Tank</p>}
      {alerts.wlgw?.length > 0 &&
        alerts.wlgw.map((alert, index) => {
        return (
        <div key={index} className="row">
          {getAlertCard(alert)}
        </div>)
        })
      }
      {alerts.slgw.length > 0 && <p className='fw-bold'>For Sump Tank</p>}
      {alerts.slgw?.length > 0 &&
        alerts.slgw.map((alert, index) => {
        return (
          <div key={index} className="row">
            {getAlertCard(alert)}
          </div>)
        })
      }
    </div>
  )
}