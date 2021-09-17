import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const {
    isOpen,
    onClose,
    onAddPlace,
  } = props;

  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChange(evt) {
    evt.target.name === 'TitleProfile'
      ? setTitle(evt.target.value)
      : setLink(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: title,
      link: link,
    });

    setTitle('')
    setLink('')
  }

  return (
    <PopupWithForm
      name='new-card'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton='Создать'>
      <input
        onChange={handleChange}
        type="text"
        placeholder="Название"
        className="popup__input"
        name="TitleProfile"
        id="TitleInput"
        value={title || ''}
        required />
      <span
        className="popup__form-error"
        id="TitleInput-error"></span>
      <input
        onChange={handleChange}
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input"
        name="PhotoProfile"
        id="PhotoInput"
        value={link || ''}
        required />
      <span
        className="popup__form-error"
        id="PhotoInput-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;