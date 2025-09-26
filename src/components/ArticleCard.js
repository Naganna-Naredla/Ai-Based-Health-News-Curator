import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaNewspaper, FaHeart, FaShare, FaThumbsUp, FaComment } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { analyzeSentiment } from '../services/aiService';

function ArticleCard({ article, onSave, onDelete, isSaved = false }) {
  const navigate = useNavigate();
  const { title, summary } = article;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [reactions, setReactions] = useState({ like: 0, heart: 0, share: 0 });
  const [sentiment, setSentiment] = useState('');

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(`comments-${article.id}`) || '[]');
    setComments(savedComments);
    const savedReactions = JSON.parse(localStorage.getItem(`reactions-${article.id}`) || '{"like":0,"heart":0,"share":0}');
    setReactions(savedReactions);

    async function loadSentiment() {
      const sent = await analyzeSentiment(article.content, article.id, article.language);
      setSentiment(sent);
    }
    loadSentiment();
  }, [article.id, article.content, article.language]);

  const addComment = () => {
    if (newComment.trim()) {
      const updated = [...comments, newComment];
      setComments(updated);
      localStorage.setItem(`comments-${article.id}`, JSON.stringify(updated));
      setNewComment('');
    }
  };

  const addReaction = (type) => {
    const updated = { ...reactions, [type]: reactions[type] + 1 };
    setReactions(updated);
    localStorage.setItem(`reactions-${article.id}`, JSON.stringify(updated));
  };

  const totalReactions = reactions.like + reactions.heart + reactions.share;
  const positiveReactions = reactions.like + reactions.heart;
  const positivePercent = totalReactions > 0 ? Math.round((positiveReactions / totalReactions) * 100) : 0;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="article-card"
    >
      <h2>
        <FaNewspaper style={{ marginRight: '8px' }} />
        {title}
        {sentiment && (
          <span className={`sentiment-badge ${sentiment}`} style={{ marginLeft: '10px' }}>
            {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
          </span>
        )}
      </h2>
      <p>{summary.tldr}</p>
      <ul>
        {summary.takeaways.map((point, i) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
      <div className="reactions">
        <button onClick={() => addReaction('like')}><FaThumbsUp /> {reactions.like}</button>
        <button onClick={() => addReaction('heart')}><FaHeart /> {reactions.heart}</button>
        <button onClick={() => addReaction('share')}><FaShare /> {reactions.share}</button>
      </div>
      <p className="reaction-summary">{positivePercent}% positive reactions</p>
      <div className="comments-section">
        <div className="comments-list">
          {comments.map((comment, i) => <p key={i}>{comment}</p>)}
        </div>
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addComment()}
        />
        <button onClick={addComment}><FaComment /> Comment</button>
      </div>
      <button onClick={() => navigate(`/article/${article.id}`)}>
        Expand
      </button>
      {isSaved ? (
        <button onClick={onDelete}>Delete</button>
      ) : (
        <button onClick={onSave}>Save</button>
      )}
    </motion.div>
  );
}

export default ArticleCard;