import React from 'react';

//1 картинка - удачное подключение 2 - ошибка
import Confirm from '../images/Confirm.svg';
import Dismiss from '../images/Dismiss.svg';

function InfoTooltip(props) {
  const {
    isOpen,
    onClose,
    isSuccess,
  } = props

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__button-close"
          type="button"
          aria-label="Закрыть"></button>
        <img className='popup__union' src={isSuccess ? Confirm : Dismiss }  alt={isSuccess ? Dismiss : Confirm} />
        <p className="popup__text">
        {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;