import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import LoginPage from './routes/login.jsx';
import AuthProvider from './components/authprovider';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CheckSession from './components/checksession';

ReactDOM.render(
  <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
              <Route path='/login' element={<LoginPage/>}/>
              <Route path='/' element={<CheckSession><App/></CheckSession>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
