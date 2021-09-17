import React from 'react';

function Login(props) {
  const {
    onAuthorizeUser,
  } = props

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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

    onAuthorizeUser(
      password,
      email
    );
  }

  return (
    <div className="login">
      <h2 className="login__title">
        Вход
      </h2>
      <form
        onSubmit={handleSubmit}
        className="login__form"
      >
        <input 
        onChange={handleEmailChange}
        value={email}
        className="login__input" 
        type="Email"
        placeholder="Email"/>
        <input 
        onChange={handlePasswordChange}
        value={password}
        className="login__input"
        type="password"
        placeholder="Пароль"/>
        <button
          className="login__button"
          type="submit">
            Войти
        </button>
      </form>
    </div>
    );
}

export default Login;