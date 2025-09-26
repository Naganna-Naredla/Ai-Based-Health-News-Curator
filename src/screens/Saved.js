import { useState, useEffect, useContext } from 'react';
import ArticleCard from '../components/ArticleCard';
import { motion } from 'framer-motion';
import { LanguageContext } from '../App';

function Saved() {
  const { language } = useContext(LanguageContext);
  const [savedArticles, setSavedArticles] = useState([]);

  const translations = {
    english: { title: 'Saved Articles', noSaved: 'No saved articles yet.' },
    hindi: { title: 'सहेजे गए लेख', noSaved: 'अभी तक कोई सहेजे गए लेख नहीं।' },
    telugu: { title: 'సేవ్ చేసిన ఆర్టికల్స్', noSaved: 'ఇంకా సేవ్ చేసిన ఆర్టికల్స్ లేవు.' }
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('saved') || '[]');
    const filtered = saved.filter(a => a.language === language);
    setSavedArticles(filtered);
  }, [language]);

  const handleDelete = (id) => {
    const updated = savedArticles.filter(a => a.id !== id);
    localStorage.setItem('saved', JSON.stringify(updated));
    setSavedArticles(updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <h1>{translations[language].title}</h1>
      <div className="feed-grid">
        {savedArticles.map((article) => (
          <ArticleCard key={article.id} article={article} onDelete={() => handleDelete(article.id)} isSaved={true} />
        ))}
      </div>
      {savedArticles.length === 0 && <p>{translations[language].noSaved}</p>}
    </motion.div>
  );
}

export default Saved;