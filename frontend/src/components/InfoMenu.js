import { Link } from "react-router-dom"

export default function InfoMenu({ loggedIn, email, onSignOut }) {
  return (
    <div className="header__info">
      <p className="header__email">{email}</p>
      <Link className={`header__link ${loggedIn && "header__link_type_active"}`} to="sign-up" onClick={onSignOut}>Выйти</Link>
    </div>
  )
}