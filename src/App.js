// src/App.jsx (Update the Routes section to add the new page)

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginSignup from './screens/LoginSignup';
import Home from './screens/Home';
import Feed from './screens/Feed';
import Saved from './screens/Saved';
import Settings from './screens/Settings';
import Dashboard from './screens/Dashboard'; // Assuming this exists
import HealthMetrics from './screens/HealthMetrics'; // New import
import ArticleDetail from './screens/ArticleDetail';
import Header from './components/Header';

export const AuthContext = React.createContext();
export const LanguageContext = React.createContext();

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  const [language, setLanguage] = useState(localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')).language : 'english');
  const navigate = useNavigate();

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <Header />
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/metrics" element={<HealthMetrics />} /> {/* New route */}
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </LanguageContext.Provider>
    </AuthContext.Provider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;