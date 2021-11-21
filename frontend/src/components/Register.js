import React, { useState } from "react";
import AuthorizationPage from "./AuthorizationPage.js";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleChange(e) {
    const {value} = e.target
    e.target.name === 'Email' ? setEmail(value) : setPassword(value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onRegister(password, email)
  }

  return (
    <div className="register">
      <AuthorizationPage formName="register" onSubmit={handleSubmit} title="Регистрация" textOnButton="Зарегистрироваться">
        <input className="popup__info popup__info_type_login" id="email" name="Email" type="email" placeholder="Email" minLength="6" maxLength="40" required value={email || ''} onChange={handleChange} />
        <input className="popup__info popup__info_type_login" id="password" name="Password" type="password" placeholder="Пароль" minLength="6" maxLength="40" required value={password || ''} onChange={handleChange} />
      </AuthorizationPage>
    </div>
  )
}