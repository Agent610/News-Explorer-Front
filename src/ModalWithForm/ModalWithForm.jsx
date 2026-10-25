import "./ModalWithForm.css";
import CloseButton from "../../images/close.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  extraActions,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_form">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={CloseButton} alt="Close-Button" />
        </button>
        <form
          className="modal__form"
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          {children}

          {extraActions && (
            <div className="modal__extra-actions">{extraActions}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
