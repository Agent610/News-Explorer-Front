import "./MobileModal.css";
import { Link } from "react-router-dom";
import CloseButton from "../../images/close.svg";

const MobileModal = ({
  isOpen,
  onClose,
  handleSigninClick,
  isLoggedIn,
  handleSignoutClick,
  currentUser,
}) => {
  return (
    <div className={`modal modal-mobile ${isOpen ? "modal_opened" : ""}`}>
      <div className="mobile">
        <button className="mobile__close" onClick={onClose}>
          <img
            src={CloseButton}
            alt="Close-button"
            className="mobile__close-button"
          />
        </button>

        <Link to="/" className="mobile__link" onClick={onClose}>
          Home
        </Link>

        {isLoggedIn ? (
          <>
            <Link to="/saved-news" className="mobile__link" onClick={onClose}>
              Saved Articles
            </Link>

            <button
              type="button"
              className="mobile__button"
              onClick={() => {
                handleSignoutClick();
                onClose();
              }}
            >
              {currentUser ? currentUser.name : "Log out"}
            </button>
          </>
        ) : (
          <button
            type="button"
            className="mobile__button"
            onClick={() => {
              handleSigninClick();
            }}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileModal;
