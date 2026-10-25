import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onSubmit, onClose, handleSigninClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailOnChange = (e) => setEmail(e.target.value);
  const handlePasswordOnChange = (e) => setPassword(e.target.value);
  const handleUserNameOnChange = (e) => setUserName(e.target.value);

  const isFormValid =
    email.trim() !== "" && password.trim() !== "" && userName.trim() !== "";

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit({ email, password, userName });
      setEmail("");
      setPassword("");
      setUserName("");
      setError("");
    } catch (error) {
      console.error(error);
      setError("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <ModalWithForm
        title="Sign Up"
        buttonText="Sign Up"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleFormSubmit}
      >
        {error && <p className="modal__error">{error}</p>}
        <label htmlFor="register-email" className="modal__label">
          Email
          <input
            type="email"
            className="modal__input"
            id="register-email"
            placeholder="Enter email"
            onChange={handleEmailOnChange}
            value={email}
            required
          />
        </label>
        <label htmlFor="register-password" className="modal__label">
          Password
          <input
            type="password"
            className="modal__input"
            id="register-password"
            placeholder="Enter password"
            onChange={handlePasswordOnChange}
            value={password}
            required
          />
        </label>
        <label htmlFor="register-username" className="modal__label">
          Username
          <input
            type="text"
            className="modal__input"
            id="register-username"
            placeholder="Enter your username"
            onChange={handleUserNameOnChange}
            value={userName}
            required
          />
        </label>

        <button
          type="submit"
          className="modal__submit"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Signing up..." : "Signup"}
        </button>

        <button
          type="button"
          className="register__link"
          onClick={handleSigninClick}
        >
          or Sign in
        </button>
      </ModalWithForm>
    </div>
  );
};

export default RegisterModal;
