import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import github from "../../images/github.svg";
import socialmedia from "../../images/social-media.svg";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <nav className="footer__nav">
          <Link to="/" className="footer__nav-link">
            Home
          </Link>
          <Link to="/about" className="footer__nav-link">
            TripleTen
          </Link>
        </nav>
        <div className="footer__icons">
          <a
            href="https://github.com/Agent610"
            className="footer__nav-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={github} alt="Github" className="footer__icon" />
          </a>
          <a href="#" className="footer__nav-link">
            <img
              src={socialmedia}
              alt="Social Media"
              className="footer__icon"
            />
          </a>
        </div>
        <p className="footer__copyright">©2024 Supersite Powered by News API</p>
      </div>
    </footer>
  );
}

export default Footer;
