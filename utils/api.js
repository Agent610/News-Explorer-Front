export const baseUrl = (
  import.meta.env.VITE_API_URL || "http://localhost:3001"
).replace(/\/+$/, "");

export async function handleServerResponse(res) {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || `Error: ${res.status}`);
  }
  return data;
}

function getAuthHeaders() {
  const token = localStorage.getItem("jwt");

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

//Getting the article(s)
export function getItems() {
  return fetch(`${baseUrl}/articles`, {
    method: "GET",
    headers: getAuthHeaders(),
  }).then(handleServerResponse);
}

//Saving article
export function saveArticle(article) {
  return fetch(`${baseUrl}/articles`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(article),
  }).then(handleServerResponse);
}

//Deleting article
export function deleteArticle(articleId) {
  return fetch(`${baseUrl}/articles/${articleId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(handleServerResponse);
}

const api = {
  getItems,
  saveArticle,
  deleteArticle,
};

export default api;
