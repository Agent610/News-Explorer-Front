import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onSubmit, onClose, handleSignupClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailOnChange = (e) => setEmail(e.target.value);
  const handlePasswordOnChange = (e) => setPassword(e.target.value);

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({ email, password });
      setEmail("");
      setPassword("");
      setError("");
    } catch (error) {
      setError(
        error.message || "An error occured during login, try again later",
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <ModalWithForm
        title="Sign in"
        buttonText="Sign in"
        isOpen={isOpen}
        onClose={() => {
          setError("");
          onClose();
        }}
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        extraActions={
          <button
            type="button"
            className="login__link"
            onClick={handleSignupClick}
          >
            or Sign up
          </button>
        }
      >
        {error && <p className="modal__error">{error}</p>}
        <label htmlFor="login-email" className="modal__label">
          Email
          <input
            type="email"
            className="modal__input"
            id="login-email"
            placeholder="Enter email"
            onChange={handleEmailOnChange}
            value={email}
            required
          />
        </label>
        <label htmlFor="login-password" className="modal__label">
          Password
          <input
            type="password"
            className="modal__input"
            id="login-password"
            placeholder="Enter passwrod"
            onChange={handlePasswordOnChange}
            value={password}
            required
          />
        </label>
        <button
          type="submit"
          className="modal__submit"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Signing in ..." : "Sign in"}
        </button>
      </ModalWithForm>
    </div>
  );
};

export default LoginModal;
