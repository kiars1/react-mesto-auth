import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const {
    onCardClick,
    onCardLike,
    onCardDelete,
    card,
  } = props;

  //Слушатель клика по картинке
  function handleCardClick() {
    onCardClick(card);
  }

  //Слушатель клика по лайку
  function handleLikeClick() {
    onCardLike(card);
  }

  //Слушатель кнопки удаления
  function handleDeleteClick() {
    onCardDelete(card)
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `${isOwn ? 'photo__trash-button' : 'photo__trash-button_hiden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `${isLiked ? 'photo__like-button_active' : 'photo__like-button'}`;

  return (
    <li className="photo__container">
      <img
        src={card.link}
        className="photo__image"
        alt={card.name}
        onClick={handleCardClick} />
      <h2 className="photo__title">
        {card.name}
      </h2>
      <div className="photo__like">
        <button
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Лайк"
          onClick={handleLikeClick}>
        </button>
        <span className="photo__score">
          {card.likes.length}
        </span>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteClick}>
      </button>
    </li>
  )
}

export default Card;