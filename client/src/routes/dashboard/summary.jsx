import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../../components/authprovider';
import ago from 's-ago';

export default function SummaryPage() {
    const auth = useAuth();
    const [status, setStatus] = useState();
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

    return (
        <div>
            <h3>Summary</h3>
            <p className='fw-normal'>This page a brief summary of various components of the water management system in your apartment.</p>
            {!status && <p className='fw-normal'>Please wait while we fetch latest water levels in your aparment...</p>}
            {!status &&
                <div className='d-flex justify-content-center'>
                    <div className='spinner-border m-5' role='status' style={{ width: '3rem', height: '3rem' }}></div>
                </div>}
            {status &&
                <div className="row">
                    <div className="col-8">
                        <div className='card mb-3 top-m-5'>
                            <div className='row g-0 h-100'>
                                <div className='col-md-4 bg-secondary'>
                                    <div className='img-fluid rounded-start d-flex align-items-center justify-content-center'>
                                        <i className='bi bi-water' style={{ fontSize: '07rem', color: 'cornflowerblue' }}></i>
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <div className='card-body'>
                                        <h5 className='card-title'>Overhead Tank</h5>
                                        <p className='card-text'>The overhead water tank has <span className='fw-bold'>{status.wlgw.volume}</span> liters of water.</p>
                                        <p className='card-text'><small className='text-muted'>Last updated {ago(new Date(status.wlgw.timestamp))}</small></p>
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
                                <div className='col-md-4 bg-secondary'>
                                    <div className='img-fluid rounded-start d-flex align-items-center justify-content-center'>
                                        <i className='bi bi-moisture' style={{ fontSize: '07rem', color: 'cornflowerblue' }}></i>
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <div className='card-body'>
                                        <h5 className='card-title'>Sump Tank</h5>
                                        <p className='card-text'>The sump tank has <span className='fw-bold'>{status.slgw.volume}</span> liters of water.</p>
                                        <p className='card-text'><small className='text-muted'>Last updated {ago(new Date(status.slgw.timestamp))}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {status && status.pump && false &&
                <div className="row">
                    <div className="col-8">
                        <div className='card mb-3 top-m-5'>
                            <div className='row g-0 h-100'>
                                <div className='col-md-4 bg-secondary'>
                                    <div className='img-fluid rounded-start d-flex align-items-center justify-content-center'>
                                        <i className='bi bi-moisture' style={{ fontSize: '07rem', color: 'cornflowerblue' }}></i>
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <div className='card-body'>
                                        <h5 className='card-title'>Pump</h5>
                                        <p className='card-text'>
                                            Pump is currently <span className='fw-bold'>{status.pump.isOn ? 'OFF' : 'ON'}</span>.
                                        </p>
                                        <p className='card-text'><small className='text-muted'>Last updated {ago(new Date(status.pump.timestamp))}</small></p>
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