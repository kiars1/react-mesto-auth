import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function Register(props) {
  const {
    onRegisterUser,
    onRegisterPopup,
  } = props

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


   //Таргетим инпуты
  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  //Передаем данные на уровень выше
  function handleSubmit(evt) {
    evt.preventDefault();

    onRegisterUser(
      password,
      email
    );
  }

  return (
    <div className="register">
      <h2 className="register__title">
        Регистрация
      </h2>
      <form
        className="register__form"
        onSubmit={handleSubmit}
      >
        <input
          className="register__input"
          type="Email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="register__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
        />
        <button
          onClick={onRegisterPopup}
          className="register__button"
          type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="register__link">
        Уже зарегистрированы? <Link to="/sign-in" className="register__link-login">Войти</Link>
      </p>
    </div>
  );
}

export default withRouter(Register);