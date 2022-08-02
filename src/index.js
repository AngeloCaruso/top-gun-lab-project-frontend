import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Main from './components/layout/Main';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Logs from './pages/logs';
import RequireAuth from './components/auth/RequireAuth';
import ValidateAuthenticated from './components/auth/ValidateAuthenticated';
import { Result } from 'antd';
import CreateEdit from './pages/createEdit';
import './index.css';
import 'antd/dist/antd.css';
import './App.css';
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<RequireAuth />}>
          <Route path='jobs' element={<Main><Home /></Main>}></Route>
          <Route path='logs/:id' element={<Main><Logs /></Main>}></Route>
          <Route path='/new-cron' element={<Main><CreateEdit/></Main>} />
        </Route>
        <Route path='/login' element={<ValidateAuthenticated><Login /></ValidateAuthenticated>} />
        <Route path='/register' element={<ValidateAuthenticated><Register /></ValidateAuthenticated>} />
        <Route path="*" element={
          <main style={{ padding: "1rem" }}>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Link to={'/dashboard/jobs'} type="primary">Back Home</Link>}
            />
          </main>
        }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
