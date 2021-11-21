import React from "react";
import AuthorizationPage from "./AuthorizationPage.js";

export default function Register({ onAuth }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleChange(e) {
    const {value} = e.target
    e.target.name === 'Email' ? setEmail(value) : setPassword(value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onAuth(password, email)
  }

  return (
    <div className='login'>
      <AuthorizationPage formName="login" onSubmit={handleSubmit} title="Вход" textOnButton="Войти">
        <input className="popup__info popup__info_type_login" id="email" name="Email" type="email" placeholder="Email" minLength="6" maxLength="40" required value={email || ''} onChange={handleChange} />
        <input className="popup__info popup__info_type_login" id="password" name="Password" type="password" placeholder="Пароль" minLength="6" maxLength="40" required value={password || ''} onChange={handleChange} />
      </AuthorizationPage>
    </div>
  )
}