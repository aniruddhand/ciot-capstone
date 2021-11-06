import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div style={{height: '100%'}}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">Smart Water Level Controller</a>
        </div>
      </nav>
      <div className="container">
        <div className="row" style={{marginTop: '10px'}}>
          <div className="col-3">
          <div className="card" style={{width: '18rem'}}>
            <div className="card-body">
              <h5 className="card-title">Dashboard</h5>
              <ul className="list-group list-group-flush">
                <Link to='/dashboard/summary'className="list-group-item">Summary</Link>
                <Link to='/dashboard/usage'className="list-group-item">Usage</Link>
                <Link to='/dashboard/supply'className="list-group-item">Supply</Link>
              </ul>
              <h5 className="card-title" style={{marginTop: '10px'}}>Schedules</h5>
              <ul className="list-group list-group-flush">
                <Link to='/dashboard/summary'className="list-group-item">Today's Schedule</Link>
              </ul>
              <h5 className="card-title" style={{marginTop: '10px'}}>Alerts</h5>
              <ul className="list-group list-group-flush">
                <Link to='/dashboard/summary'className="list-group-item">Today's Schedule</Link>
              </ul>              
            </div>
          </div>
          </div>
        </div>
      </div>      
      <Outlet/>
    </div>
  );
}

export default App;