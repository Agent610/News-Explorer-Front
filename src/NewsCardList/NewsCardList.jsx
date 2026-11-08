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

  // const validArticles = articles.filter(
  //   (article) => article.urlToImage || article.image,
  // );

  const validArticles = articles;

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

  const checkIfArticleIsSaved = (article) => {
    const articleLink = article.url || article.link;

    return savedArticles.some((saved) => saved.link === articleLink);
  };

  return (
    <section className="newscard-list">
      <div className="newscard-list__container">
        {validArticles.slice(0, visibleCards).map((article) => {
          return (
            <NewsCard
              articleId={article._id}
              key={article._id || article.url || article.link}
              title={article.title}
              description={article.description || article.text}
              date={new Date(
                article.publishedAt || article.date,
              ).toLocaleDateString()}
              source={
                typeof article.source === "string"
                  ? article.source
                  : article.source?.name
              }
              link={article.url || article.link}
              image={article.urlToImage || article.image}
              isSaved={checkIfArticleIsSaved(article)}
              isLoggedIn={isLoggedIn}
              onSaveArticle={onSaveArticle}
              onDeleteArticle={onDeleteArticle}
              keyword={article.keyword}
            />
          );
        })}
      </div>
      {visibleCards < validArticles.length && (
        <button className="newscard-list__show-more" onClick={handleShowMore}>
          Show more
        </button>
      )}
    </section>
  );
}

NewsCardList.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      publishedAt: PropTypes.string.isRequired,
      source: PropTypes.shape({ name: PropTypes.string }),
      url: PropTypes.string.isRequired,
      urlToImage: PropTypes.string.isRequired,
    }),
  ),
  isLoggedIn: PropTypes.bool.isRequired,
  onSaveArticle: PropTypes.func.isRequired,
  savedArticles: PropTypes.array.isRequired,
  onDeleteArticle: PropTypes.func.isRequired,
};
export default NewsCardList;
