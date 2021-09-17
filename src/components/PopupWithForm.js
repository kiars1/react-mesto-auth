import React from 'react';

function PopupWithForm(props) {
  const {
    name,
    title,
    textButton,
    isOpen,
    children,
    onClose,
    onSubmit,
  } = props

  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}></button>
        <h2 className="popup__title">
          {title}
        </h2>
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}>
          {children}
          <button
            className="popup__button-save"
            type="submit">
            {textButton}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;