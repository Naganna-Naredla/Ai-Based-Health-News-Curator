import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../App';

function Settings() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [refreshInterval, setRefreshInterval] = useState('daily');
  const [notifications, setNotifications] = useState(true);
  const [aiVerbosity, setAiVerbosity] = useState('standard');

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    if (savedSettings) {
      setRefreshInterval(savedSettings.refreshInterval || 'daily');
      setNotifications(savedSettings.notifications || true);
      setLanguage(savedSettings.language || 'english');
      setAiVerbosity(savedSettings.aiVerbosity || 'standard');
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('settings', JSON.stringify({ refreshInterval, notifications, language, aiVerbosity }));
    alert('Settings saved!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <h1>Settings</h1>
      <form className="settings-form">
        <label>Refresh Interval:</label>
        <select value={refreshInterval} onChange={(e) => setRefreshInterval(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <label>Notifications:</label>
        <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
        <label>Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="telugu">Telugu</option>
        </select>
        <label>AI Verbosity:</label>
        <select value={aiVerbosity} onChange={(e) => setAiVerbosity(e.target.value)}>
          <option value="standard">Standard</option>
          <option value="detailed">Detailed</option>
        </select>
        <button onClick={handleSave}>Save</button>
      </form>
    </motion.div>
  );
}

export default Settings;