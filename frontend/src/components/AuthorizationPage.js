import React from "react";
import { Link } from "react-router-dom";

export default function AuthorizationPage({ formName, onSubmit, title, children, textOnButton }) {
  return (
    <div className="auth">
      <form className="auth__container" name={formName} noValidate onSubmit={onSubmit}>
        <h2 className="auth__title">{title}</h2>
        {children}
        <button className="auth__button" type="submit">{textOnButton}</button>
        {formName === "register" && <Link className="auth__link" to="/sign-up">Уже зарегистрированы? Войти</Link>}
      </form>
    </div>
  )
}