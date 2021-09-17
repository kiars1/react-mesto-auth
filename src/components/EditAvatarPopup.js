import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef('');

  const {
    isOpen,
    onClose,
    onUpdateAvatar,
  } = props;

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      name='new-card'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      textButton='Сохранить'>
      <input
        ref={avatarRef}
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input"
        name="AvatarProfile"
        id="AvatarInput"
        required />
      <span
        className="popup__form-error"
        id="AvatarInput-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;

