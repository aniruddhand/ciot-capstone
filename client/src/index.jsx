import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import LoginPage from './routes/login.jsx';
import AuthProvider from './components/authprovider';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CheckSession from './components/checksession';
import SummaryPage from './routes/dashboard/summary';
import UsagePage from './routes/dashboard/usage';
import CurrentSchedule from './routes/schedules/current';
import FleetHub from './routes/status/fleet';
import ActiveNotifications from './routes/alerts/active';
import NotificationsHistory from './routes/alerts/history';
import MonitorPage from './routes/dashboard/monitor';

ReactDOM.render(
  <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/' element={<CheckSession><App/></CheckSession>}>
                <Route path='/dashboard/summary' element={<CheckSession><SummaryPage/></CheckSession>}/>
                <Route path='/dashboard/usage' element={<CheckSession><UsagePage/></CheckSession>}/>
                <Route path='/dashboard/monitor' element={<CheckSession><MonitorPage/></CheckSession>}/>
                <Route path='/schedules/current' element={<CheckSession><CurrentSchedule/></CheckSession>}/>
                <Route path='/status/fleet' element={<CheckSession><FleetHub/></CheckSession>}/>
                <Route path='/alerts/active' element={<CheckSession><ActiveNotifications/></CheckSession>}/>
                <Route path='/alerts/history' element={<CheckSession><NotificationsHistory/></CheckSession>}/>
              </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
