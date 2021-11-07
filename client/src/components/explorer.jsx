import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const grpCls = 'list-group-item';
const actGrpCls = 'list-group-item active';

export default function ContentExplorer() {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === '/') {
			navigate('/dashboard/summary', {replace: true});
		}
	}, [location, navigate]);

	function getClassName(path) {
		return location.pathname.endsWith(path) ? actGrpCls : grpCls;
	}

	return (
		<div className='card shadow' style={{ width: '18rem' }}>
			<div className='card-header'>
				<h5 className='card-title'>Dashboard</h5>
			</div>
			<div className='card-body'>
				<ul className='list-group list-group-flush'>
					<Link to='/dashboard/summary' className={getClassName('/dashboard/summary')}>Summary</Link>
					<Link to='/dashboard/usage'className={getClassName('/dashboard/usage')}>Usage</Link>
				</ul>
			</div>
			<div className='card-header' style={{borderTop: '1px solid rgba(0,0,0,.125)'}}>
				<h5 className='card-title' style={{ marginTop: '10px' }}>Schedules</h5>
			</div>
			<div className='card-body'>
				<ul className='list-group list-group-flush'>
					<Link to='/schedules/current' className={getClassName('/schedules/current')}>Today's Schedule</Link>
				</ul>
			</div>
			<div className='card-header' style={{borderTop: '1px solid rgba(0,0,0,.125)'}}>
				<h5 className='card-title' style={{ marginTop: '10px' }}>Notifications</h5>
			</div>
			<div className='card-body'>
				<ul className='list-group list-group-flush'>
					<Link to='/alerts/active' className={getClassName('/alerts/active')}>Active</Link>
				</ul>
			</div>
		</div>
	);
}