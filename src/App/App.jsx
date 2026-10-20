import React from "react";
import "./App.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
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
        setSearchResults(response);
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

  const handleSaveArticle = (title, link, description, source, image) => {
    if (!isLoggedIn) {
      return;
    }

    const alreadySaved = savedArticles.some((article) => article.url === link);

    if (alreadySaved) {
      setSavedArticles((prev) =>
        prev.filter((article) => article.url !== link),
      );
    } else {
      setSavedArticles((prev) => [
        ...prev,
        {
          title,
          url: link,
          description: description,
          source: { name: source },
          urlToImage: image,
          keyword: searchKeyword,
        },
      ]);
    }
  };

  const handleDeleteArticle = (link) => {
    if (!isLoggedIn) {
      return;
    }

    setSavedArticles((prev) => prev.filter((article) => article.url !== link));
  };

  //Authentication

  const handleLogin = ({ email, password }) => {
    setIsAuthLoading(true);

    login({ email, password })
      .then((response) => {
        if (response.token) {
          setToken(response.token);
          setLoggedIn(true);
          setCurrentUser(response.user);
          localStorage.setItem("currentUser", JSON.stringify(response.user));
          handleCloseModal();
        }
      })
      .catch((error) => {
        console.error("Login failed", error);
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  const handleRegister = ({ email, password, userName }) => {
    setIsAuthLoading(true);

    register({ email, password, userName })
      .then((response) => {
        if (response) {
          setMessage("Registration successfully completed !");
          setActiveModal("registerSuccess");
        }
      })
      .catch((error) => {
        console.error("Registration failed", error);
        setMessage("Registration failed");
      })
      .finally(() => {
        setIsAuthLoading(false);
      });
  };

  const handleSignoutClick = () => {
    removeToken();
    setLoggedIn(false);
  };

  React.useEffect(() => {
    const token = getToken();
    const savedUser = localStorage.getItem("currentUser");

    if (token && savedUser) {
      setLoggedIn(true);
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const [isSavedArticlesLoaded, setIsSavedArticlesLoaded] = useState(false);

  React.useEffect(() => {
    if (isSavedArticlesLoaded) {
      localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
    }
  }, [savedArticles, isSavedArticlesLoaded]);

  React.useEffect(() => {
    const saved = localStorage.getItem("savedArticles");
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
    setIsSavedArticlesLoaded(true);
  }, []);

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
      </div>
      {/* DON'T TOUCH THESE THREE LINES */}
    </div>
  );
}

export default App;
