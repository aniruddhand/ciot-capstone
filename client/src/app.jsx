import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar';
import ContentExplorer from './components/explorer';

function App() {
  return (
    <div style={{ height: '100%' }}>
      <Navbar/>
      <div className='container'>
        <div className='row' style={{ marginTop: '10px' }}>
          <div className='col-3'><ContentExplorer/></div>
          <div className='col'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;