import { useState, useEffect, useContext } from 'react';
import { fetchNews } from '../services/newsService';
import { generateSummary } from '../services/aiService';
import ArticleCard from '../components/ArticleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactPullToRefresh from 'react-pull-to-refresh';
import { motion } from 'framer-motion';
import { LanguageContext } from '../App';

function Feed() {
  const { language } = useContext(LanguageContext);
  const [articles, setArticles] = useState([]);
  const [todayArticles, setTodayArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // Temporarily set to true for all loading
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // New filter state

  const translations = {
    english: { title: 'Health News Feed', expand: 'Expand', save: 'Save' },
    hindi: { title: 'स्वास्थ्य समाचार फ़ीड', expand: 'विस्तार', save: 'सहेजें' },
    telugu: { title: 'ఆరోగ్య వార్తలు ఫీడ్', expand: 'విస్తరించు', save: 'సేవ్' }
  };

  const categories = ['all', 'disease', 'nutrition', 'fitness', 'accident', 'general']; // From search

  const loadArticles = async (reset = false) => {
    if (reset) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const news = await fetchNews();
      let filtered = news.filter(a => a.language === language);
      if (filter !== 'all') {
        filtered = filtered.filter(a => a.category === filter);
      }
      const start = reset ? 0 : articles.length;
      const pageSize = 10; // Increased to show more articles initially
      const nextArticles = filtered.slice(start, start + pageSize);
      const summaries = await Promise.all(
        nextArticles.map(async (article) => ({
          ...article,
          summary: await generateSummary(article.content, article.id, language),
        }))
      );
      setArticles(reset ? summaries : [...articles, ...summaries]);
      setHasMore(filtered.length > start + pageSize); // Revert to true if more articles exist
      const todayFiltered = filtered.filter(a => a.date === '2025-09-24');
      setTodayArticles(todayFiltered);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadArticles(true); // Reload on filter or language change
  }, [language, filter]);

  const handleRefresh = () => {
    return new Promise((resolve) => {
      loadArticles(true).then(resolve);
    });
  };

  const handleSave = (article) => {
    const saved = JSON.parse(localStorage.getItem('saved') || '[]');
    localStorage.setItem('saved', JSON.stringify([...saved, article]));
    alert('Saved!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <h1>{translations[language].title}</h1>
      <div className="filter-section">
        <label>Filter by Category:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {categories.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
        </select>
      </div>
      <div className="scrolling-news">
        <p>{todayArticles.map(a => a.title).join(' ... ')}</p>
      </div>
      {(loading || refreshing) ? <LoadingSpinner /> : null}
      {error && (
        <div className="error">
          {error}
          <button onClick={() => loadArticles(true)}>Retry</button>
        </div>
      )}
      <ReactPullToRefresh onRefresh={handleRefresh} isRefreshing={refreshing}>
        <InfiniteScroll
          dataLength={articles.length}
          next={() => loadArticles(false)}
          hasMore={hasMore}
          loader={(loading && !refreshing) ? <LoadingSpinner /> : null}
        >
          <div className="feed-grid">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} onSave={() => handleSave(article)} />
            ))}
          </div>
        </InfiniteScroll>
      </ReactPullToRefresh>
    </motion.div>
  );
}

export default Feed;