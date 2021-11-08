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
        fetch('/api/status').then(response => {
            if (response.status >= 200 && response.status < 400) {
                response.json().then(body => {
                   setStatus(body);
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
            <h3>Status</h3>
            <p className='fw-normal'>This page shows the current status of the water management system in your apartment.</p>
            {!status && <p className='fw-normal'>Please wait while we fetch latest water levels in your aparment...</p>}
            {!status && 
            <div className='d-flex justify-content-center'>
                <div className='spinner-border m-5' role='status' style={{width: '3rem', height: '3rem'}}></div>
            </div>}
            {status &&
                <div className='card mb-3 top-m-5' style={{maxWidth: '540px'}}>
                    <div className='row g-0'>
                        <div className='col-md-4 bg-secondary'>
                            <div className='img-fluid rounded-start d-flex align-items-center justify-content-center'>
                                <i className='bi bi-water' style={{fontSize: '07rem', color: 'cornflowerblue'}}></i>
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
            }
        </div>
    )
}