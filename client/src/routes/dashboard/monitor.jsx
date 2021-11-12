import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../../components/authprovider';

function getAlertLevel(timestamp) {
  const now = Date.now();
  const diffInMill = (now - timestamp);
  
  if (diffInMill >= (5*60*1000) && diffInMill <= (10*60*1000)) {
    return 'warning';
  }

  if (diffInMill > (10*60*1000)) {
    return 'danger';
  }

  return 'secondary';
}

function getAlertMessage(timestamp) {
  const now = Date.now();
  const diffInMill = (now - timestamp);
  
  const late = diffInMill >= (5*60*1000) && diffInMill <= (10*60*1000);
  const tooLate = diffInMill > (10*60*1000);

  if (late || tooLate) {
    return (
      <p className='card-text'>
        The overhead water tank is <span className='fw-bold'>OFFLINE</span><br/>
        {late && !tooLate && 'It has not communicated since last 10 minutes.'}
        {tooLate && 'It has has been more than 10 minutes since it last communicated.'}
      </p>)
  } else {
    return (<p className='card-text'>
      The overhead water tank is <span className='fw-bold'>ONLINE</span></p>)
  }
}

function getHumanReadableDateTime(timestamp) {
  let date = new Date(timestamp);
  return date.toLocaleString()
}

export default function MonitorPage() {
    const auth = useAuth();
    const [status, setStatus] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        if (status) {
            return;
        }

        const cachedStatus = sessionStorage.getItem('fleetStatus');
        if (cachedStatus) {
            setStatus(JSON.parse(cachedStatus));
            return;
        }

        fetch('/api/status').then(response => {
            if (response.status >= 200 && response.status < 400) {
                response.json().then(body => {
                    setStatus(body);
                    sessionStorage.setItem('fleetStatus', JSON.stringify(body));
                });
            } else {
                response.text().then(data => {
                    console.log(data);
                })
            }
        });
    }, [status, auth, navigate]);

    function refreshStatus() {
        sessionStorage.removeItem('fleetStatus');
        setStatus(null);
    }

    return (
        <div>
            <h3>Fleet Status</h3>
            <p className='fw-normal'>This page shows whether all the components of your system are online.</p>
            {!status && <p className='fw-normal'>Please wait while we fetch the details...</p>}
            {!status &&
                <div className='d-flex justify-content-center'>
                    <div className='spinner-border m-5' role='status' style={{ width: '3rem', height: '3rem' }}></div>
                </div>}
            {status &&
                <div className="row">
                    <div className="col-8">
                        <p className='d-flex justify-content-end'>
                            <button type="button" className="btn btn-outline-secondary" onClick={refreshStatus}>Refresh</button>
                        </p>
                        <div className='card mb-3 top-m-5'>
                            <div className='row g-0 h-100'>
                                <div className={'col-md-4 bg-' + getAlertLevel(status.wlgw.timestamp)}>
                                    <div className='img-fluid rounded-start d-flex align-items-center justify-content-center'>
                                        <i className='bi bi-water' style={{ fontSize: '07rem', color: 'cornflowerblue' }}></i>
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <div className='card-body'>
                                        <h5 className='card-title'>Overhead Tank</h5>
                                        {getAlertMessage(status.wlgw.timestamp)}
                                        <p className='card-text'><small className='text-muted'>Received last update on {getHumanReadableDateTime(status.wlgw.timestamp)}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {status && status.slgw &&
                <div className="row">
                  <div className="col-8">
                    <div className='card mb-3 top-m-5'>
                        <div className='row g-0 h-100'>
                            <div className={'col-md-4 bg-' + getAlertLevel(status.slgw.timestamp)}>
                                <div className='img-fluid rounded-start d-flex align-items-center justify-content-center'>
                                    <i className='bi bi-moisture' style={{ fontSize: '07rem', color: 'cornflowerblue' }}></i>
                                </div>
                            </div>
                            <div className='col-md-8'>
                                <div className='card-body'>
                                    <h5 className='card-title'>Sump Tank</h5>
                                    {getAlertMessage(status.slgw.timestamp)}
                                    <p className='card-text'><small className='text-muted'>Received last update on {getHumanReadableDateTime(status.slgw.timestamp)}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}