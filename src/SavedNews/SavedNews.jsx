import React from "react";
import NewsCard from "../NewsCard/NewsCard.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import "./SavedNews.css";
import TrashIcon from "../../images/trash.svg";

const SavedNews = ({
  savedArticles,
  isLoggedIn,
  onSaveArticle,
  currentUser,
  onDeleteArticle,
}) => {
  const userName = currentUser?.name || "User";

  const normalizedSavedArticles = savedArticles.map((article) => ({
    ...article,
    publishedAt:
      article.date || article.publishedAt || new Date().toISOString(),
  }));

  const getTopKeywords = (articles) => {
    const keywordCounts = {};

    articles.forEach((article) => {
      const keyword = article.keyword;
      if (keyword) {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
      }
    });

    const sortedKeywords = Object.entries(keywordCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([keyword]) => keyword);

    if (sortedKeywords.length === 0) return "";

    if (sortedKeywords.length === 1) {
      return sortedKeywords[0];
    } else if (sortedKeywords === 2) {
      return `${sortedKeywords[0]} and ${sortedKeywords[1]}`;
    } else {
      return `${sortedKeywords[0]}, ${sortedKeywords[1]}, and ${
        sortedKeywords.length - 2
      } others`;
    }
  };

  return (
    <main className="saved-news-page">
      <header className="saved-news-header">
        <p className="saved-news-header__label">Saved Articles</p>
        <h2 className="saved-news-header__title">
          {userName}, you have {savedArticles.length} saved{""}
          {savedArticles.length === 1 ? "article" : "articles"}
        </h2>
        {savedArticles.length > 0 && (
          <p className="saved-news-header__keywords">
            By keywords: {getTopKeywords(savedArticles)}
          </p>
        )}
      </header>

      {savedArticles.length === 0 ? (
        <p>You haven't saved any articles</p>
      ) : (
        <NewsCardList
          articles={normalizedSavedArticles}
          isLoggedIn={isLoggedIn}
          onSaveArticle={onSaveArticle}
          savedArticles={savedArticles}
          onDeleteArticle={onDeleteArticle}
        />
      )}
    </main>
  );
};

export default SavedNews;
