const News_URL = "https://newsapi.org/";
const API_KEY = "fb6cff6571004bdb8d9f0274dc7989a1";

export function searchNews(query) {
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const from = sevenDaysAgo.toISOString().split("T")[0];
  const to = today.toISOString().split("T")[0];

  const url = `${News_URL}?q=${encodeURIComponent(
    query,
  )}&from=${from}&to=${to}&pageSize=100&apiKey=${API_KEY}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Please enter a keyword : ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => data.articles)
    .catch((error) => {
      console.error(
        "Sorry, something went wrong during the request. Please try again later.",
        error,
      );
      throw error;
    });
}

const news = { searchNews };
export default news;
