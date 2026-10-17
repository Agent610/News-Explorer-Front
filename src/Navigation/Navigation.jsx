import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import headerlogout from "../../images/headerlogout.svg";
import savednewslogout from "../../images/savednewslogout.svg";

function Navigation({
  isLoggedIn,
  currentUser,
  handleSigninClick,
  handleSignoutClick,
  isNewsPage,
  handleMobileClick,
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const SignInButton = () => (
    <button className="nav-list__button" onClick={handleSigninClick}>
      Sign In
    </button>
  );

  console.log(currentUser);

  return (
    <nav className="navigation">
      <button className="hamburger-menu" onClick={handleMobileClick}>
        {isMenuOpen ? (
          /*Close (X) icon */
          <div className="close-icon">
            <span className="close-icon__line"></span>
            <span className="close-icon__line"></span>
            {""}
          </div>
        ) : (
          /*Hamburger menu lines */
          <>
            <span className="hamburger-menu__line"></span>
            <span className="hamburger-menu__line"></span>
            <span className="hamburger-menu__line"></span>
          </>
        )}
      </button>

      {/*Mobile Menu */}
      {window.innerWidth <= 425 && (
        <div className={`mobile-menu ${isMenuOpen ? "mobile-menu-open" : ""}`}>
          <div className="mobile-menu__content">
            <ul
              className={`mobile-menu__list ${
                isNewsPage ? "nav-list_saved-news" : ""
              }`}
            >
              <li className="nav-list__item">
                <Link to="/" className="nav-list__link nav-list__link-home">
                  Home
                </Link>
              </li>
              {!isLoggedIn && (
                <li className="nav-list__item">
                  <SignInButton />
                </li>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-list__item">
                    <Link to="/saved-news" className="nav-list__link">
                      Saved Articles
                    </Link>
                  </li>
                  <li className="nav-list__item">
                    <button
                      className="nav-list__button"
                      onClick={handleSignoutClick}
                    >
                      {currentUser && currentUser.name}
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}

      {/*Desktop Menu */}
      <ul className={`nav-list ${isNewsPage ? "nav-list_saved-news" : ""}`}>
        <li className="nav-list__item">
          <Link to="/" className="nav-list__link nav-list__link-home">
            Home
          </Link>
        </li>

        {isLoggedIn ? (
          /* Logged in state */
          <div className="nav-list__auth">
            <li className="nav-list__item">
              <Link to="/saved-news" className="nav-list__link">
                Saved Articles
              </Link>
            </li>
            <li className="nav-list__item">
              <button className="nav-list__button" onClick={handleSignoutClick}>
                {currentUser && currentUser.name}
                <img
                  src={isNewsPage ? savednewslogout : headerlogout}
                  alt="Logout"
                  className="nav-list__logout"
                />
              </button>
            </li>
          </div>
        ) : (
          /*Logged out state */
          <div className="nav-list__auth">
            <li className="nav-list__item">
              <SignInButton />
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
