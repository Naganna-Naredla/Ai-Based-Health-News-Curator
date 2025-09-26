import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rewriteArticle, generateHealthTip, analyzeSentiment } from '../services/aiService';
import { fetchNews } from '../services/newsService';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';
import { LanguageContext } from '../App';

function ArticleDetail() {
  const { language } = useContext(LanguageContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [rewritten, setRewritten] = useState('');
  const [tip, setTip] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadArticle = async (skipCache = false) => {
    setLoading(true);
    setError(null);
    setDisplayText(''); // Reset typing
    try {
      const news = await fetchNews();
      const articleData = news.find((a) => a.id === id);
      if (articleData) {
        setArticle(articleData);
        const lang = articleData.language;
        const rewrittenText = await rewriteArticle(articleData.content, articleData.id, lang, skipCache);
        const tipText = await generateHealthTip(articleData.content, articleData.id, lang);
        const sent = await analyzeSentiment(articleData.content, articleData.id, lang);
        setRewritten(rewrittenText);
        setTip(tipText);
        setSentiment(sent);
      } else {
        setError('Article not found');
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadArticle();
  }, [id, language]);

  useEffect(() => {
    if (rewritten && tip) {
      const fullText = rewritten + '\n\nHealth Tip: ' + tip;
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayText((prev) => prev + fullText[i]);
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 20); // Typing speed
      return () => clearInterval(typingInterval);
    }
  }, [rewritten, tip]);

  const handleListen = () => {
    if (displayText) {
      const utterance = new SpeechSynthesisUtterance(displayText);
      utterance.lang = article.language === 'english' ? 'en-US' : article.language === 'hindi' ? 'hi-IN' : 'te-IN'; // Match article language
      utterance.rate = 0.9; // Slightly slower for clarity
      speechSynthesis.speak(utterance);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">{error}</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container detail-container"
    >
      {loading ? <LoadingSpinner /> : null}
      {error && <div className="error">{error}</div>}
      {article && (
        <>
          <button onClick={() => navigate('/feed')}>Back to Feed</button>
          <h1>
            {article.title}
            {sentiment && (
              <span className={`sentiment-badge ${sentiment}`} style={{ marginLeft: '10px' }}>
                {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
              </span>
            )}
          </h1>
          <div className="original-text">
            {article.content}
          </div>
          <div className="rewritten-text">{displayText}</div>
          <button onClick={() => loadArticle(true)}>Regenerate</button>
          <button onClick={handleListen}>Listen</button> {/* New Listen button */}
        </>
      )}
    </motion.div>
  );
}

export default ArticleDetail;