import React from 'react';

function ImagePopup(props) {

  const {
    isOpen,
    onClose,
    card,
  } = props;

  return (
    <div className={`popup popup_type_image ${isOpen && 'popup_opened'}`}>
      <figure className="popup__figure">
        <button
          className="popup__button-close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}>
        </button>
        <img
          src={card.link}
          alt={card.name}
          className="popup__image" />
        <figcaption>
          <p className="popup__subtitle">
            {card.name}
          </p>
        </figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;

