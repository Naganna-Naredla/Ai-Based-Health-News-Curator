import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchNews } from '../services/newsService';
import { generateDailyChallenge, generateNutritionalTip } from '../services/aiService';
import { motion } from 'framer-motion';
import { LanguageContext } from '../App';
import LoadingSpinner from '../components/LoadingSpinner';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const { language, setLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [savedCount, setSavedCount] = useState(0);
  const [mostReacted, setMostReacted] = useState(null);
  const [dailyChallenge, setDailyChallenge] = useState('');
  const [foodLog, setFoodLog] = useState('');
  const [nutritionalInsight, setNutritionalInsight] = useState('');
  const [suggestedArticles, setSuggestedArticles] = useState([]);
  const chartRef = useRef(null);

  const translations = {
    english: { title: 'Health Dashboard', recent: 'Recent Articles', stats: 'Quick Stats', total: 'Total Articles', saved: 'Saved Articles', mostReacted: 'Most Reacted Article', challenge: 'Daily Health Challenge', nutrition: 'Nutritional Tracker', enterFood: 'Log your daily food intake (e.g., rice, sugar, fruits)...', submitFood: 'Submit Food Log', insight: 'Nutritional Insight' },
    hindi: { title: 'स्वास्थ्य डैशबोर्ड', recent: 'हाल के लेख', stats: 'त्वरित आँकड़े', total: 'कुल लेख', saved: 'सहेजे गए लेख', mostReacted: 'सबसे अधिक प्रतिक्रिया वाला लेख', challenge: 'दैनिक स्वास्थ्य चुनौती', nutrition: 'पोषण ट्रैकर', enterFood: 'अपना दैनिक भोजन रिकॉर्ड करें (उदा., चावल, चीनी, फल)...', submitFood: 'भोजन रिकॉर्ड सबमिट करें', insight: 'पोषण इनसाइट' },
    telugu: { title: 'ఆరోగ్య డాష్‌బోర్డ్', recent: 'ఇటీవలి ఆర్టికల్స్', stats: 'త్వరిత గణాంకాలు', total: 'మొత్తం ఆర్టికల్స్', saved: 'సేవ్ చేసిన ఆర్టికల్స్', mostReacted: 'అత్యధిక రియాక్షన్ ఆర్టికల్', challenge: 'రోజువారీ ఆరోగ్య సవాలు', nutrition: 'పోషకాహార ట్రాకర్', enterFood: 'మీ రోజువారీ ఆహారాన్ని లాగ్ చేయండి (ఉదా., అన్నం, షుగర్, ఫ్రూట్స్)...', submitFood: 'ఆహార లాగ్ సబ్మిట్', insight: 'పోషకాహార ఇన్సైట్' }
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const news = await fetchNews();
        const filtered = news.filter(a => a.language === language);
        setArticles(filtered);

        // Calculate category frequencies
        const categories = ['disease', 'nutrition', 'fitness', 'accident', 'general'];
        const counts = categories.map(cat => ({
          category: cat,
          count: filtered.filter(a => a.category === cat).length
        }));
        setCategoryData(counts);

        // Saved articles count
        const saved = JSON.parse(localStorage.getItem('saved') || '[]').filter(a => a.language === language);
        setSavedCount(saved.length);

        // Most reacted article
        const reacted = filtered.map(a => {
          const reactions = JSON.parse(localStorage.getItem(`reactions-${a.id}`) || '{"like":0,"heart":0,"share":0}');
          const total = reactions.like + reactions.heart + reactions.share;
          return { ...a, totalReactions: total };
        });
        const mostReactedArticle = reacted.reduce((max, curr) => (max.totalReactions || 0) > curr.totalReactions ? max : curr, {});
        setMostReacted(mostReactedArticle.title ? mostReactedArticle : null);

        // Daily Health Challenge
        const challenge = await generateDailyChallenge(categories, language);
        setDailyChallenge(challenge);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    loadData();
  }, [language]);

  const handleFoodSubmit = async () => {
    if (foodLog.trim()) {
      const insight = await generateNutritionalTip(foodLog, 'nutrition', language);
      let suggestions = [];

      if (insight.includes('sugar')) {
        suggestions = articles.filter(a => a.category === 'nutrition' && a.title.toLowerCase().includes('diet')).slice(0, 3);
      } else if (insight.includes('protein')) {
        suggestions = articles.filter(a => a.category === 'nutrition' && a.title.toLowerCase().includes('protein')).slice(0, 3);
      } else if (insight.includes('fat')) {
        suggestions = articles.filter(a => a.category === 'nutrition' && a.title.toLowerCase().includes('fat')).slice(0, 3);
      } else {
        suggestions = articles.filter(a => a.category === 'nutrition').slice(0, 3);
      }

      setNutritionalInsight(insight);
      setSuggestedArticles(suggestions);

      setFoodLog('');
    }
  };

  const chartData = {
    labels: categoryData.map(d => d.category.charAt(0).toUpperCase() + d.category.slice(1)),
    datasets: [{
      label: 'Article Count',
      data: categoryData.map(d => d.count),
      backgroundColor: [
        'rgba(0, 212, 170, 0.6)',
        'rgba(78, 205, 196, 0.6)',
        'rgba(255, 106, 107, 0.6)',
        'rgba(255, 230, 109, 0.6)',
        'rgba(0, 168, 204, 0.6)'
      ],
      borderColor: [
        'rgba(0, 212, 170, 1)',
        'rgba(78, 205, 196, 1)',
        'rgba(255, 106, 107, 1)',
        'rgba(255, 230, 109, 1)',
        'rgba(0, 168, 204, 1)'
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `Health Article Categories (${language.charAt(0).toUpperCase() + language.slice(1)})`,
        font: { size: 16 },
        color: '#2d3748'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Number of Articles' }
      },
      x: {
        title: { display: true, text: 'Category' }
      }
    }
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [language]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <h1>{translations[language].title}</h1>
      <div className="dashboard-controls">
        <label>Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="telugu">Telugu</option>
        </select>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div className="dashboard-chart" style={{ height: '400px', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <Bar key={language} data={chartData} options={chartOptions} ref={chartRef} />
          </div>
          <div className="dashboard-challenge">
            <h2>{translations[language].challenge}</h2>
            <p>{dailyChallenge}</p>
          </div>
          <div className="dashboard-nutrition">
            <h2>{translations[language].nutrition}</h2>
            <input
              type="text"
              placeholder={translations[language].enterFood}
              value={foodLog}
              onChange={(e) => setFoodLog(e.target.value)}
            />
            <button onClick={handleFoodSubmit}>{translations[language].submitFood}</button>
            {nutritionalInsight && (
              <>
                <h3>{translations[language].insight}</h3>
                <p>{nutritionalInsight}</p>
                <ul>
                  {suggestedArticles.map((art) => (
                    <li key={art.id}>
                      <a href={`/article/${art.id}`} onClick={(e) => { e.preventDefault(); navigate(`/article/${art.id}`); }}>
                        {art.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="dashboard-stats">
            <h2>{translations[language].stats}</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{translations[language].total}</h3>
                <p>{articles.length}</p>
              </div>
              <div className="stat-card">
                <h3>{translations[language].saved}</h3>
                <p>{savedCount}</p>
              </div>
              <div className="stat-card">
                <h3>{translations[language].mostReacted}</h3>
                <p>{mostReacted ? mostReacted.title : 'None'}</p>
              </div>
            </div>
          </div>
          <div className="dashboard-recent">
            <h2>{translations[language].recent}</h2>
            <div className="recent-grid">
              {articles.slice(0, 3).map((article) => (
                <div key={article.id} className="recent-article" onClick={() => navigate(`/article/${article.id}`)}>
                  <h3>{article.title}</h3>
                  <p className="date">{article.date}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="dashboard-nav">
            <button onClick={() => navigate('/feed')}>Go to Feed</button>
            <button onClick={() => navigate('/saved')}>View Saved Articles</button>
            <button onClick={() => navigate('/settings')}>Settings</button>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default Dashboard;