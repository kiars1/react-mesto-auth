import React from 'react';
import Card from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const {
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    cards,
    onCardLike,
    onCardDelete
  } = props;

  return (
    <>
      <section className="profile">
        <img
          className="profile__image"
          src={currentUser.avatar}
          alt="Аватар профиля" />
        <button
          onClick={onEditAvatar}
          className="profile__button-edit-photo"
          type="button"
          aria-label="Редактировать">
        </button>
        <div className="profile__info">
          <h1 className="profile__name">
            {currentUser.name}
          </h1>
          <p className="profile__description">
            {currentUser.about}
          </p>
          <button
            onClick={onEditProfile}
            className="profile__button-edit"
            type="button"
            aria-label="Редактировать">
          </button>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__button-add"
          type="button"
          aria-label="Добавить">
        </button>
      </section>

      <section className="photo">
        <ul className="photo__list">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            )
          })}
        </ul>
      </section>
    </>
  );
}

export default Main;