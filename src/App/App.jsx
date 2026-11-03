import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import Main from "../Main/Main.jsx";
import About from "../About/About.jsx";
import NewsCard from "../NewsCard/NewsCard.jsx";
import {
  login,
  register,
  checkToken,
  setToken,
  getToken,
  removeToken,
} from "../../utils/auth.js";
import Footer from "../Footer/Footer.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import MobileModal from "../MobileModal/MobileModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import RegistrationSuccess from "../RegistrationSuccess/RegistrationSuccess.jsx";
import { getItems, saveArticle, deleteArticle } from "../../utils/api.js";
import { searchNews } from "../../utils/news.js";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";

function App() {
  const location = useLocation();

  //User
  const [currentUser, setCurrentUser] = useState({});

  //If logged in
  const [isLoggedIn, setLoggedIn] = useState(false);
  //SearchForm.jsx
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [message, setMessage] = useState("");

  const userStorageKey = isLoggedIn
    ? currentUser?._id || currentUser?.id || currentUser?.email || null
    : null;

  const savedArticlesKey = userStorageKey
    ? `savedArticles:${userStorageKey}`
    : null;

  //Modals
  const [activeModal, setActiveModal] = useState("");

  const handleCloseModal = () => {
    setActiveModal("");
  };

  React.useEffect(() => {
    if (activeModal) {
      //Handle Escape Key
      const handleEscape = (event) => {
        if (event.key === "Escape") {
          handleCloseModal();
        }
      };

      //Handle click outside key
      const handleClickOutside = (event) => {
        if (event.target.classList.contains("modal")) {
          handleCloseModal();
        }
      };

      // Event Listeners
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [activeModal]);

  //Article work
  const handleSearch = (query) => {
    setIsSearchLoading(true);
    setHasSearched(true);
    setSearchKeyword(query);

    searchNews(query)
      .then((response) => {
        const articlesWithKeyword = response.map((article) => ({
          ...article,
          keyword: query,
        }));

        setSearchResults(articlesWithKeyword);
        setShowSearchForm(true);
      })
      .catch((error) => {
        console.error("Error loading news:", error);
        setSearchResults([]);
      })
      .finally(() => {
        setIsSearchLoading(false);
      });
  };

  const [searchKeyword, setSearchKeyword] = useState("");

  //Article save functionality
  const [savedArticles, setSavedArticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [loadedUserKey, setLoadedUserKey] = useState(null);

  const handleSaveArticle = (title, link, description, source, image) => {
    if (!isLoggedIn) return;

    const originalArticle = searchResults.find(
      (article) => article.url === link,
    );

    const articleData = {
      keyword: searchKeyword,
      title,
      text: description,
      date: originalArticle?.publishedAt || new Date().toISOString(),
      source,
      link,
      image,
    };

    saveArticle(articleData)
      .then((savedArticle) => {
        setSavedArticles((previousArticles) => [
          ...previousArticles,
          savedArticle,
        ]);
      })
      .catch((error) => {
        console.error("Failed to save article:", error);
      });
  };

  const handleDeleteArticle = (articleId) => {
    if (!isLoggedIn) return;

    deleteArticle(articleId)
      .then(() => {
        setSavedArticles((previousArticles) =>
          previousArticles.filter((article) => article._id !== articleId),
        );
      })
      .catch((error) => {
        console.error("Failed to delete article:", error);
      });
  };

  React.useEffect(() => {
    if (!savedArticlesKey) {
      setSavedArticles([]);
      setLoadedUserKey(null);
      return;
    }

    try {
      const saved = localStorage.getItem(savedArticlesKey);
      const parsedArticles = saved ? JSON.parse(saved) : [];

      setSavedArticles(Array.isArray(parsedArticles) ? parsedArticles : []);
    } catch (error) {
      console.error("Failed to load saved articles:", error);
      setSavedArticles([]);
    }

    setLoadedUserKey(savedArticlesKey);
  }, [savedArticlesKey]);

  React.useEffect(() => {
    if (!savedArticlesKey || loadedUserKey !== savedArticlesKey) {
      return;
    }

    localStorage.setItem(savedArticlesKey, JSON.stringify(savedArticles));
  }, [savedArticles, savedArticlesKey, loadedUserKey]);

  //Authentication

  const handleLogin = ({ email, password }) => {
    setIsAuthLoading(true);

    login({ email, password })
      .then((response) => {
        if (!response.token) {
          throw new Error("The server didn't return an authentication token.");
        }

        setToken(response.token);

        return checkToken(response.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);
        handleCloseModal();

        return getItems()
          .then((articles) => {
            setSavedArticles(articles);
          })
          .catch((error) => {
            console.error("Couldn't load saved articles:", error);
            setSavedArticles([]);
          });
      })
      .catch((error) => {
        console.error("Failure in Login:", error);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  const handleRegister = ({ email, password, userName }) => {
    setIsAuthLoading(true);

    register({ email, password, userName })
      .then(() => {
        setMessage("Registration successfully completed!");
        setActiveModal("registerSuccess");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        setMessage("Registration failed");
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  const handleSignoutClick = () => {
    removeToken();
    setLoggedIn(false);
    setCurrentUser({});
    setSavedArticles([]);
    handleCloseModal();
  };

  useEffect(() => {
    const token = getToken();

    if (!token) return;

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setLoggedIn(true);

        return getItems();
      })
      .then((articles) => {
        setSavedArticles(articles);
      })
      .catch((error) => {
        console.error("Couldn't restore user session:", error);

        removeToken();
        setLoggedIn(false);
        setCurrentUser({});
        setSavedArticles([]);
      });
  }, []);

  const [isSavedArticlesLoaded, setIsSavedArticlesLoaded] = useState(false);

  //Preloader
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  //Location in the App

  return (
    <div className="app">
      {isSearchLoading && (
        <div className="modal">
          <div className="modal__content modal_opened">
            <Preloader />
            <p>Loading ...</p>
          </div>
        </div>
      )}
      <div className="app__content">
        <Header
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          handleSigninClick={() => setActiveModal("login")}
          handleSignoutClick={handleSignoutClick}
          showSearchForm={showSearchForm}
          handleSearch={handleSearch}
          setShowSearchForm={setShowSearchForm}
          handleMobileClick={() => setActiveModal("mobile")}
        />

        <Main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {hasSearched && (
                    <>
                      <h2 className="search__title">Search Results</h2>
                      <NewsCardList
                        articles={searchResults}
                        isLoggedIn={isLoggedIn}
                        onSaveArticle={handleSaveArticle}
                        savedArticles={savedArticles}
                        onDeleteArticle={handleDeleteArticle}
                      />
                    </>
                  )}
                  <About />
                </>
              }
            />
            <Route
              path="/saved-news"
              element={
                <SavedNews
                  savedArticles={savedArticles}
                  isLoggedIn={isLoggedIn}
                  onSaveArticle={handleSaveArticle}
                  currentUser={currentUser}
                  onDeleteArticle={handleDeleteArticle}
                />
              }
            />
          </Routes>
        </Main>

        <Footer></Footer>

        {activeModal === "registerSuccess" && (
          <RegistrationSuccess
            onClose={handleCloseModal}
            handleSigninClick={() => setActiveModal("login")}
          />
        )}

        <LoginModal
          isOpen={activeModal === "login"}
          onSubmit={handleLogin}
          onClose={handleCloseModal}
          handleSignupClick={() => setActiveModal("register")}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onSubmit={handleRegister}
          onClose={handleCloseModal}
          handleSigninClick={() => setActiveModal("login")}
        />
        <MobileModal
          isOpen={activeModal === "mobile"}
          onClose={handleCloseModal}
          handleSigninClick={() => setActiveModal("login")}
          isLoggedIn={isLoggedIn}
          handleSignoutClick={handleSignoutClick}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}

export default App;
