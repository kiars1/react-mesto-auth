import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditProfilePopup(props) {

  const {
    isOpen,
    onClose,
    onUpdateUser,
  } = props;

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChange(evt) {
    evt.target.name === 'nameProfile'
      ? setName(evt.target.value)
      : setDescription(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton='Сохранить'>
      <input
        onChange={handleChange}
        value={name || ''}
        type="text"
        placeholder="Имя"
        className="popup__input"
        name="nameProfile"
        id="nameInput"
        pattern="[А-Яа-яA-Za-z -]{1,}"
        required />
      <span
        className="popup__form-error"
        id="nameInput-error">
      </span>
      <input
        onChange={handleChange}
        value={description || ''}
        type="text"
        placeholder="О себе"
        className="popup__input"
        name="jobProfile"
        id="jobInput"
        required />
      <span
        className="popup__form-error"
        id="jobInput-error">
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;