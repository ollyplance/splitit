import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {CssBaseline} from '@geist-ui/react';
import HomeComponent from './components/pages/home';
import CreateComponent from './components/pages/create';
import ClaimComponent from './components/pages/claim';
import NavComponent from './components/common/nav';
import InputClaimComponent from './components/pages/input-claim';
import TestComponent from './components/pages/test';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/create" element={<CreateComponent />} />
        <Route path="/claim" element={<InputClaimComponent />} />
        <Route path="/claim/:id" element={<ClaimComponent />} />
        <Route path="/test" element={<TestComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
