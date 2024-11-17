import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPageDemo from './chat_page_demo.js';
import App from './components/App.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<ChatPageDemo />} />
        <Route path="/chat" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
