import { func } from "prop-types";

export const baseUrl = "http://localhost:3000";

const token = localStorage.getItem("jwt");

//Getting the article(s)
export function getItems() {
  return new Promise((resolve) => {
    const saved = localStorage.getItem("savedArticles");
    const items = saved ? JSON.parse(saved) : [];
    resolve(items);
  });
}

//Saving article
export function saveArticle(article) {
  return new Promise((resolve) => {
    const existing = JSON.parse(localStorage.getItem("savedArticles")) || [];

    const newArticle = {
      ...article,
      _id: crypto.randomUUID(),
      savedAt: new Date().toISOString(),
    };
    existing.push(newArticle);
    localStorage.setItem("savedArticles", JSON.stringify(existing));
    resolve(newArticle);
  });
}

//Deleting article
export function deleteArticle(articleId) {
  return new Promise((resolve) => {
    let items = JSON.parse(localStorage.getItem("savedArticles")) || [];
    items = items.filter((item) => item._id !== articleId);
    localStorage.setItem("savedArticles", JSON.stringify(items));
    resolve({ message: "Article was deleted", articleId });
  });
}

const api = {
  getItems,
  saveArticle,
  deleteArticle,
};

export default api;

export function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}
