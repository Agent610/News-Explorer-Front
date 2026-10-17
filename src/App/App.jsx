import React from "react";
import "./App.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import Navigation from "../Navigation/Navigation.jsx";

function App() {
  const location = useLocation();

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
