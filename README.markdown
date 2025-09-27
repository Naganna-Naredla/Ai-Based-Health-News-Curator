# AI-Based Health News Curator

## 1. Project Setup & Demo
Good Morning All, I am Naredla Naganna Dora Sastry pursing Btech in ECE at IIIT Sricity
**Web:** Run `npm install && npm start` to launch the application locally at `http://localhost:3000`.
here i am attaching the Code using the github Link : https://github.com/Naganna-Naredla/Ai-Based-Health-News-Curator.git

**Demo:** This is the link of Hosted Website https://ai-based-health-news-curator.vercel.app/

## 2. Problem Understanding
The project aims to develop an AI-powered health news curator to simplify and summarize health articles into a daily feed, tackling information overload. It involves loading mock articles from mockArticles.json or RSS, generating a 2-line TL;DR and 3 takeaways per article, displaying a paginated feed with pull-to-refresh, and offering an expanded, simplified rewrite. Assumptions include using Gemini API for AI tasks, relying on mock or NewsAPI data, basic topic-based personalization, and requiring an internet connection.

## 3. AI Prompts & Iterations
**In-App AI Prompts:**

**Initial Prompt (Summarization):** "Summarize this health news article in a 2-line TL;DR and 3 bullet points for key takeaways, focusing on facts and implications." Used in `aiService.js` for initial tests.

**Issues Faced:**
- Summaries were sometimes too broad or missed topic relevance.
- Inconsistent formatting in AI responses (e.g., varying bullet point styles).
- Slow API responses impacted feed refresh performance.

**Refined Prompt:** "As a health expert, summarize this [topic] article in a 2-line TL;DR (max 50 words) and 3 concise bullet points (max 20 words each). Use evidence-based facts, beginner-friendly language, and consistent formatting. Cite the source and avoid medical advice." For rewriting: "Rewrite this article in a friendly, simple tone (8th-grade reading level) in 100-150 words." Iterations improved consistency and relevance, as seen in provided Grok conversation links.

**Development Prompts Used:**
- Create the webpage including home page, feed, saved articles, and settings with language switch (Telugu, Hindi, English) and dark theme.
- Load the mock JSON file and display articles in the home page.
- Implement a "View Summary" button that expands the article to show a 2-line TL;DR and 3 bullet points.
- Display articles in 3 languages: Telugu, Hindi, English.
- Add like, share, comment features, and an expand button to summarize the article by AI in 2 lines.
- Add a listen button to hear the generated summary lines via text-to-speech.
- Divide articles based on categories like nutrition, accident, etc.
- Create a dashboard with plots and health tips under it, plus a "Load More" button at the bottom to load additional articles.
- Add normal health values like sugar (blood sugar) and BP (blood pressure).

## 4. Architecture & Code Structure
The web application is built with React, following a modular structure:
- **`App.js`**: Manages routing with React Router for navigation between screens.
- **Components:**
  - `ArticleCard.js`: Reusable card for displaying article summaries.
  - `Header.js`: Navigation header component.
  - `LoadingSpinner.js`: Loading indicator for API calls.
- **Screens:**
  - `ArticleDetail.js`: Displays AI-rewritten article in a simple tone.
  - `Dashboard.js`: Initial screen for topic selection or mock data load.
  - `Feed.js`: Renders paginated feed with pull-to-refresh.
  - `HealthMetrics.js`: Displays normal health values like BP and sugar.
  - `HealthReference.js`: Reference section for health categories and metrics.
  - `Home.js`: Main entry point or topic selection screen.
  - `LoginSignup.js`: Authentication screen (if implemented).
  - `Saved.js`: Saved articles screen.
  - `Settings.js`: User preference management, including language selection.
- **Services:**
  - `aiService.js`: Integrates with the latest Gemini API for summarization, rewriting, and sentiment analysis.
  - `newsService.js`: Handles article data fetching from `mockArticles.json` or external APIs.
- **Styles:** `App.css` and `index.css` for global styling.
- **Data:** `mockArticles.json` contains sample article data.
- **State Management:** Uses React Context for managing user preferences and article state.

## 5. Screenshots
-Here is the Drive link attached of all the screenshots of the website:
Link: https://drive.google.com/drive/folders/1pHUO2k8n07YxtF4C7zcmdwjFNJBZI--c?usp=sharing

## 6. Known Issues / Improvements
**Known Issues:**
- Pull-to-refresh occasionally fails if API rate limits are hit.
- Inconsistent summary formatting persists in rare cases (e.g., missing bullets).
- No loading state UI for slow API responses (>2s).
- Difficulty in displaying 3 languages (Telugu, Hindi, English) consistently across all screens due to rendering issues.
- Regeneration of audio for summaries was challenging, with difficulty matching exact text-to-speech alignment.

**Improvements with More Time:**
- Implement a loading spinner and error messages for API failures.
- Cache articles in localStorage for offline access and faster reloads.
- Add retry logic for failed API calls with exponential backoff.
- Enhance pagination UX with smoother scrolling.
- Address multi-language display issues by integrating a robust i18n library (e.g., `react-i18next`) for better language switching and rendering.
- Improve audio regeneration by syncing text-to-speech with dynamic content using the latest Gemini API's enhanced audio capabilities, ensuring precise alignment.

## 7. Bonus Work
- Added support for 3 languages: Telugu, Hindi, and English, for UI elements and AI-generated summaries.
- Implemented article categories such as nutrition, with filtering options.
- Added reactions and sentiment analysis for articles using the latest Gemini API.
- Included a listen button to hear the generated summary of the article via text-to-speech.
- Added a section for normal health values, such as blood pressure (BP) and blood sugar levels.