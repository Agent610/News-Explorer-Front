import { baseUrl } from "./api";

export function searchNews(query) {
  const keyword = query.trim();

  if (!keyword) {
    return Promise.reject(new Error("Please enter a keyword."));
  }

  const url = `${baseUrl}/news?keyword=${encodeURIComponent(keyword)}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`News request failed: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => data.articles)
    .catch((error) => {
      console.error("Error loading news:", error);
      throw error;
    });
}

const news = { searchNews };

export default news;
