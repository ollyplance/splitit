import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {CssBaseline} from '@geist-ui/react';
import HomeComponent from './components/pages/home';
import CreateComponent from './components/pages/create';
import ClaimComponent from './components/pages/claim';
import NavComponent from './components/common/nav';

function App() {
  return (
    <Router>
      <CssBaseline />
      <NavComponent/>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/create" element={<CreateComponent />} />
        <Route path="/claim" element={<ClaimComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
