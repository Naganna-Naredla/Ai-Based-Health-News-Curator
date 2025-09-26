import mockArticles from '../data/mockArticles.json';

export async function fetchNews() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockArticles;
  } catch (error) {
    console.error('Error loading mock articles:', error);
    return [];
  }
}