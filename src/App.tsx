import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuccessPage from './components/SuccessPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;