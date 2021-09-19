import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main'
import Footer from './Footer'
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import ImagePopup from './ImagePopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import api from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import ProtectedRoute from './ProtectedRoute.js'
import Login from './Login.js'
import Register from './Register.js'
import InfoTooltip from './InfoTooltip.js'
import * as Auth from '../utils/Auth.js'


function App() {

  const [isHandleEditAvatarClick, setIsHandleEditAvatarClick] = React.useState(false);
  const [isHandleEditProfileClick, setIsHandleEditProfileClick] = React.useState(false);
  const [isHandleAddPlaceClick, setIsHandleAddPlaceClick] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    card: ''
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [userEmail, setUserEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

   // Проверяем токен
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      Auth.getContent(localStorage.token)
        .then((data) => {
          setUserEmail(data.data.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [history]);


  //Получаем данные пользователя
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res)
      })
      .catch(() => {
        alert('Невозможно получить карточки.'); //Потому что ошубку надо видеть
      })
  }, []);

  //Открытие Попапа Аватара
  function handleEditAvatarClick() {
    setIsHandleEditAvatarClick(true)
  }

  //Открытие Попапа Редактирования профиля
  function handleEditProfileClick() {
    setIsHandleEditProfileClick(true)
  }

  //Открытие Попапа Редактирования профиля добавления фото
  function handleAddPlaceClick() {
    setIsHandleAddPlaceClick(true)
  }

  //Открытие Попапа Картинки
  function handleCardClick(card) {
    setSelectedCard({
      isOpen: true,
      ...card
    });
  }

  //Открытие Попапа подтверждения регистрации
  function handleRegisterOpen() {
    setIsInfoTooltipOpen(true)
  }

  //Закрытие попапов
  function closeAllPopups() {
    setIsHandleEditAvatarClick(false);
    setIsHandleEditProfileClick(false);
    setIsHandleAddPlaceClick(false);
    setSelectedCard({
      isOpen: false,
      card: ''
    });
    setIsInfoTooltipOpen(false);
  }

  //Закрытие попапов на ESC
  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closeAllPopups()
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  //Закрытие попапов на пустую область
  React.useEffect(() => {
    const handleClickClose = (event) => {
      if (event.target.classList.contains('popup_opened')) {
        closeAllPopups()
      }
    };
    window.addEventListener('mousedown', handleClickClose);

    return () => {
      window.removeEventListener('mousedown', handleClickClose);
    };
  }, []);

  //Обловнялем данные пользователя.
  function handleUpdateUser(userData) {
    api
      .pushUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(() => {
        alert('Невозможно обновить данные пользователя.'); //Потому что ошубку надо видеть
      })
  }

  //Обловнялем Аватар
  function handleUpdateAvatar(userAvatar) {
    api
      .pushUserAvatar(userAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(() => {
        alert('Невозможно обновить аватар.'); //Потому что ошубку надо видеть
      })
  }

  //Получаем карточки
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res)
      })
      .catch(() => {
        alert('Невозможно получить карточки.'); //Потому что ошубку надо видеть
      })
  }, []);

  //Ставим/удаляем лайк карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(() => {
        alert('Невозможно изменить Лайк'); //Потому что ошубку надо видеть
      })
  }

  //Подтверждение удаленя карточки
  function handleCardDelete(card) {
    api
      .deleteCards(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card))
      })
      .catch(() => {
        alert('Невозможно удалить карточку.'); //Потому что ошубку надо видеть
      })
  }

  //Добавление карточки
  function handleAddPlaceSubmit(card) {
    api
      .pushCards(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(() => {
        alert('Невозможно добавить карточку.'); //Потому что ошубку надо видеть
      })
  }

  //Регистрация пользователя
  function handleRegisterUser(password, email) {
    Auth
      .register(password, email)
      .then((res) => {
        if(res.data.email === email) {
        setIsSuccess(true);
        history.push('/sign-in')
      }
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
  }

  // Выход из системы
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push('/sign-in');
  }

  //Авторизация пользователя
  function handleAuthorizeUser(password, email) {
    Auth
      .authorize(password, email)
      .then(data => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setUserEmail(email)
          setIsSuccess(true)
          setLoggedIn(true)
          history.push("/");
        };
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header userEmail={userEmail} onSignOut={handleSignOut}/>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}>
          </ProtectedRoute>

          <Route path="/sign-in">
            <Login
              onAuthorizeUser={handleAuthorizeUser} />
          </Route>

          <Route path='/sign-up'>
            <Register
              onRegisterUser={handleRegisterUser}
              onRegisterPopup={handleRegisterOpen} />
          </Route>

          <Route path="*">
            {loggedIn
              ? <Redirect to="/" />
              : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isHandleEditProfileClick}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup
          isOpen={isHandleEditAvatarClick}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup
          isOpen={isHandleAddPlaceClick}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard.isOpen}
          onClose={closeAllPopups} />
        <InfoTooltip
          isSuccess={isSuccess}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
