// src/services/aiService.js (Replace the existing file with this updated version)

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const languageMap = {
  english: 'English',
  hindi: 'Hindi',
  telugu: 'Telugu'
};

// ---------------- CLEANING FUNCTION ----------------
function cleanOutput(str) {
  if (!str) return '';

  // remove "undefined" or "null" if model accidentally appends them
  str = str.replace(/undefined|null/gi, '').trim();

  // remove weird leading non-letter/non-number/non-punctuation characters (Unicode-aware)
  str = str.replace(new RegExp('^[^\\p{L}\\p{N}\\p{P}\\p{S}]+', 'gu'), '');

  // remove extra trailing non-sentence characters (Unicode-aware)
  str = str.replace(new RegExp('[^\\p{L}\\p{N}\\p{P}\\p{S}]+$', 'gu'), '');

  return str.trim();
}

// ---------------- SUMMARY ----------------
export async function generateSummary(articleText, articleId, language = 'english', skipCache = false) {
  const cacheKey = `summary-${articleId}`;
  if (!skipCache) {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return JSON.parse(cached);
  } else {
    localStorage.removeItem(cacheKey);
  }

  const langName = languageMap[language] || language.charAt(0).toUpperCase() + language.slice(1);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = `Summarize this health article in ${langName}: ${articleText}. 
  The summary and takeaways must be entirely in ${langName}. 
  Output strictly in JSON: { "tldr": "2-line summary", "takeaways": ["point1", "point2", "point3"] }. 
  Keep it factual, simple, and health-focused. 
  Do not include any markdown, code blocks, or extra text outside the JSON.`;

  let text = '';
  try {
    const result = await model.generateContent(prompt);
    text = result.response.text();
    text = text.replace(/```json\n|\n```/g, '').trim();

    // clean the raw response
    text = cleanOutput(text);

    const summary = JSON.parse(text);
    localStorage.setItem(cacheKey, JSON.stringify(summary));
    return summary;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('Gemini API error - Invalid JSON:', error.message);
      console.error('Response text:', text);
    } else {
      console.error('Gemini API error:', error);
    }
    throw new Error('Failed to summarize. Retry?');
  }
}

// ---------------- REWRITE ----------------
export async function rewriteArticle(articleText, articleId, language = 'english', skipCache = false) {
  const cacheKey = `rewrite-${articleId}`;
  if (!skipCache) {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return cached;
  } else {
    localStorage.removeItem(cacheKey);
  }

  const langName = languageMap[language] || language.charAt(0).toUpperCase() + language.slice(1);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = `Rewrite this health article in ${langName} in a friendly, simple tone, 
  like explaining to a friend: ${articleText}. 
  The entire rewritten article must be in ${langName} only. 
  Use short sentences, avoid jargon. 
  Do not include any markdown or extra text. 
  Provide a full, complete, and accurate random variation each time.`;

  try {
    const result = await model.generateContent(prompt);
    let rewritten = result.response.text().trim();

    // clean junk at start/end
    rewritten = cleanOutput(rewritten);

    localStorage.setItem(cacheKey, rewritten);
    return rewritten;
  } catch (error) {
    console.error('API error:', error);
    throw new Error('Failed to rewrite. Retry?');
  }
}

// ---------------- SENTIMENT ANALYSIS ----------------
export async function analyzeSentiment(articleText, articleId, language = 'english') {
  const cacheKey = `sentiment-${articleId}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;

  const langName = languageMap[language] || language.charAt(0).toUpperCase() + language.slice(1);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = `Analyze the sentiment of this health article in ${langName}: ${articleText}.
  Respond with only one word: positive, negative, or neutral.`;

  try {
    const result = await model.generateContent(prompt);
    let sentiment = result.response.text().trim().toLowerCase();
    if (!['positive', 'negative', 'neutral'].includes(sentiment)) {
      sentiment = 'neutral';
    }
    localStorage.setItem(cacheKey, sentiment);
    return sentiment;
  } catch (error) {
    console.error('API error:', error);
    return 'neutral'; // fallback
  }
}

// ---------------- HEALTH TIP ----------------
export async function generateHealthTip(articleText, articleId, language = 'english') {
  const cacheKey = `healthtip-${articleId}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;

  const langName = languageMap[language] || language.charAt(0).toUpperCase() + language.slice(1);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = `Based on this health article in ${langName}: ${articleText}.
  Generate a short, relevant health tip entirely in ${langName}.
  Keep it to 1-2 sentences. No extra text or markdown.`;

  try {
    const result = await model.generateContent(prompt);
    let tip = result.response.text().trim();

    // clean junk at start/end
    tip = cleanOutput(tip);

    localStorage.setItem(cacheKey, tip);
    return tip;
  } catch (error) {
    console.error('API error:', error);
    throw new Error('Failed to generate health tip. Retry?');
  }
}

// ---------------- DAILY CHALLENGE ----------------
export async function generateDailyChallenge(articleCategories, language = 'english') {
  const cacheKey = `daily-challenge-${new Date().toDateString()}-${language}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;

  const langName = languageMap[language] || language.charAt(0).toUpperCase() + language.slice(1);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const prompt = `Generate a simple daily health challenge in ${langName} based on these categories: ${articleCategories.join(', ')}. 
  Make it 1-2 sentences, motivational, and actionable. No extra text or markdown.`;

  try {
    const result = await model.generateContent(prompt);
    let challenge = result.response.text().trim();

    challenge = cleanOutput(challenge);

    localStorage.setItem(cacheKey, challenge);
    return challenge;
  } catch (error) {
    console.error('API error:', error);
    return 'Stay active today!'; // fallback
  }
}

// ---------------- NUTRITIONAL TIP ----------------
export async function generateNutritionalTip(foodLog, articleId, language = 'english') {
  const cacheKey = `nutritional-tip-${articleId}-${new Date().toDateString()}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return cached;

  const langName = languageMap[language] || language.charAt(0).toUpperCase() + language.slice(1);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
  const prompt = `Analyze this food log in ${langName}: ${foodLog}. 
  Identify common nutrients (e.g., sugar, protein, fat) and provide a 1-2 sentence tip to improve health, entirely in ${langName}. 
  No extra text or markdown.`;

  try {
    const result = await model.generateContent(prompt);
    let tip = result.response.text().trim();
    tip = cleanOutput(tip);
    localStorage.setItem(cacheKey, tip);
    return tip;
  } catch (error) {
    console.error('API error:', error);
    return 'Maintain a balanced diet!'; // fallback
  }
}