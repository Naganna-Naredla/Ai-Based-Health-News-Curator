import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchNews } from '../services/newsService';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';
import { LanguageContext } from '../App';

function Home() {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedCount, setDisplayedCount] = useState(0); // Track how many articles to show

  const translations = {
    english: { title: 'Health News Curator', viewSummaries: 'View Summaries' },
    hindi: { title: 'स्वास्थ्य समाचार क्यूरेटर', viewSummaries: 'सारांश देखें' },
    telugu: { title: 'ఆరోగ్య వార్తలు క్యూరేటర్', viewSummaries: 'సారాంశాలను చూడండి' }
  };

  useEffect(() => {
    async function loadArticles() {
      const news = await fetchNews();
      const filtered = news.filter(a => a.language === language);
      setArticles(filtered);
      setLoading(false);
      // Set initial displayed count to n-2
      if (filtered.length > 2) {
        setDisplayedCount(filtered.length - 2);
      } else {
        setDisplayedCount(filtered.length);
      }
    }
    loadArticles();
  }, [language]);

  const handleLoadMore = () => {
    setDisplayedCount(articles.length); // Show all articles
  };

  // 👇 Headlines should only show up to displayedCount
  const scrollingHeadlines = articles
    .slice(0, displayedCount)
    .map(a => a.title)
    .join(' ... ');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <h1>{translations[language].title}</h1>
      <div className="scrolling-news">
        <p>Breaking News: {scrollingHeadlines}</p>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : articles.length === 0 ? (
        <div className="error">No articles found</div>
      ) : (
        <div className="feed-grid">
          {articles.slice(0, displayedCount).map((article) => (
            <div key={article.id} className="article-preview">
              <h2>{article.title}</h2>
              <p className="date">{article.date}</p>
              <p>{article.content.slice(0, 100)}...</p>
              <button onClick={() => navigate('/feed')}>
                {translations[language].viewSummaries}
              </button>
            </div>
          ))}
          {displayedCount < articles.length && (
            <button className="load-more-button" onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default Home;
