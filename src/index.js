import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from './components/layout/Main';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Logs from './pages/logs';
import RequireAuth from './components/auth/RequireAuth';
import ValidateAuthenticated from './components/auth/ValidateAuthenticated';
import Create from './pages/create';
import Edit from './pages/edit';
import Page404 from './pages/page404';
import './index.css';
import 'antd/dist/antd.css';
import './App.css';
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { env } from './config/.env';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={env.url}>
      <Routes>
        <Route path='/dashboard' element={<RequireAuth />}>
          <Route path='jobs' element={<Main><Home /></Main>}></Route>
          <Route path='logs/:id' element={<Main><Logs /></Main>}></Route>
          <Route path='new-cron' element={<Main><Create /></Main>} />
          <Route path='edit/:id' element={<Main><Edit /></Main>} />
        </Route>
        <Route path='/login' element={<ValidateAuthenticated><Login /></ValidateAuthenticated>} />
        <Route path='/register' element={<ValidateAuthenticated><Register /></ValidateAuthenticated>} />
        <Route path='/' element={<Navigate to='/login' />}></Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
