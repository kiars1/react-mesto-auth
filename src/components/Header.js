import React from 'react';
import { Route, Link } from "react-router-dom";

import headerLogo from '../images/logo.svg';

function Header(props) {
  const {
    onSignOut,
    userEmail,
  } = props

  return (
    <header className="header">
      <img src={headerLogo} className="header__logo" alt="Проект 'Место'"/>
      <Route path="/sign-in">
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      </Route>

      <Route path="/sign-up">
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      </Route>


      <Route exact path="/">
        <ul className="header__menu">
          <li><p className="header__link">{userEmail}</p></li>
          <Link className="header__link" to="/sign-in" onClick={onSignOut}>
            <li>Выход</li>
          </Link>
        </ul>
      </Route>

    </header>
  );
}

export default Header;