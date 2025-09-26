// src/components/Header.jsx (Update to add navigation to the new page)

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaUser, FaHome, FaRss, FaChartBar, FaHeartbeat } from 'react-icons/fa'; // Added FaHeartbeat for metrics
import { AuthContext } from '../App';

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <header className="header">
      <nav className="middle-nav">
        <button onClick={() => navigate('/dashboard')}><FaChartBar /> Dashboard</button>
        <button onClick={() => navigate('/home')}><FaHome /> Home</button>
        <button onClick={() => navigate('/feed')}><FaRss /> Feed</button>
        <button onClick={() => navigate('/saved')}>📖 Saved</button>
        <button onClick={() => navigate('/metrics')}><FaHeartbeat /> Health Metrics</button> {/* New button */}
        <button onClick={() => navigate('/settings')}>⚙️ Settings</button>
      </nav>
      <nav className="right-nav">
        {isLoggedIn ? (
          <>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')}>🔑 Login</button>
        )}
        <button onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </nav>
    </header>
  );
}

export default Header;