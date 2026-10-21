import React, { useState } from "react";
import PropTypes from "prop-types";
import NewsCard from "../NewsCard/NewsCard.jsx";
import "./NewsCardList.css";
import notFoundImg from "../../images/not-found_v1.svg";

function NewsCardList({
  articles,
  isLoggedIn,
  onSaveArticle,
  savedArticles,
  onDeleteArticle,
  keyword,
}) {
  const [visibleCards, setVisibleCards] = useState(3);

  const validArticles = articles.filter((article) => article.urlToImage);

  if (!validArticles || validArticles.length === 0) {
    return (
      <section className="news-card-list__no-results">
        <img
          src={notFoundImg}
          alt="Nothing"
          className="newscard-list__no-results-image"
        />
        <h3 className="newscard-list__no-results-title">No articles found</h3>
        <p className="newscard-list__no-results-text">
          Sorry, but nothing match {"\n"} your search terms.
        </p>
      </section>
    );
  }

  const handleShowMore = () => {
    setVisibleCards((prev) => prev + 3);
  };
}
