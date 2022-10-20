import './App.css'
import React from 'react';
import Sidebar from './components/Sidebar';
import HomeDashboard from './Pages/home';
import SavingsPage from './Pages/Savings';
import LeaderboardPage from './Pages/Leaderboard';
import Portfolio from './Pages/Portfolio';
import Login from './Security/Login';
import Register from './Security/Register';

import { AppStateProvider } from './store';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
}
from 'react-router-dom';
import Layout from './components/Layout';



function App() {

  return (
    <>
    <AppStateProvider>
    <Router>
      <Sidebar/>
      <Layout>
      <div className='content'>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomeDashboard/>}/>
          <Route path="/savings" element={<SavingsPage/>}/>
          <Route path="/leaderboard" element={<LeaderboardPage/>}/>
          <Route path="/portfolio" element={<Portfolio/>}/>
        </Routes>
      </div>
      </Layout>
    </Router>
    </AppStateProvider>
    </>
  );
}

export default App;
