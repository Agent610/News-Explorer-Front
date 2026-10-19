import React, { useState } from "react";
import PropTypes from "prop-types";
import "./NewsCard.css";
import { useLocation } from "react-router-dom";
import SaveMarked from "../../images/save-marked.svg";
import SaveUnMarked from "../../images/save-unmarked.svg";
import TrashIcon from "../../images/trash.svg";

function NewsCard({
  title,
  description,
  date,
  source,
  link,
  image,
  isSaved,
  isLoggedIn,
  onSaveArticle,
  onDeleteArticle,
  keyword,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [wasJustSaved, setWasJustSaved] = useState(false);

  const handleClick = () => {
    if (isHome) {
      if (isLoggedIn) {
        onSaveArticle(title, link, description, source, image);
        setWasJustSaved(true);
      }
    } else if (onDeleteArticle) {
      onDeleteArticle(link);
    }
  };

  return (
    <article className="news-card">
      <div className="news-card__image-container">
        {!isHome && keyword && (
          <div className="news-card__keyword">{keyword}</div>
        )}
        <img src={image} alt={title} className="news-card__image" />

        <div
          className="news-card__save-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            className={`news-card__save-button ${
              isSaved ? "news-card__save-button_saved" : ""
            }`}
            onClick={handleClick}
            aria-label={
              isHome
                ? isSaved
                  ? "Remove from saved"
                  : "Save article"
                : "Remove from saved"
            }
          >
            {!isHome ? (
              <img
                src={TrashIcon}
                alt="Remove from saved"
                className="news-card__icon"
              />
            ) : (
              <img
                src={isSaved || wasJustSaved ? SaveMarked : SaveUnMarked}
                alt={isSaved ? "Saved" : "Save article"}
                className="news-card__icon"
              />
            )}
          </button>

          {!isLoggedIn && isHovered && (
            <div className="news-card__tooltip">Sign in to save article</div>
          )}
          {!isHome && isHovered && (
            <div className="news-card__tooltip">Remove from saved</div>
          )}
        </div>
      </div>

      <div className="news-card__content">
        <p className="news-card__date">{date}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__description">{description}</p>
        <div className="news-card__footer">
          <span className="news-card__source">{source}</span>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="news-card__link"
          >
            Show more
          </a>
        </div>
      </div>
    </article>
  );
}

//PropTypes Validation Information:

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  isSaved: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onSaveArticle: PropTypes.func.isRequired,
  onDeleteArticle: PropTypes.func,
  keyword: PropTypes.string,
};

export default NewsCard;
