import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext)

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__delete-button ${isOwn ? '' : 'element__delete-button_type_hidden'}`
  )

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((item) => item._id === currentUser._id)

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `element__button ${isLiked ? 'element__button_active' : ''}`
  )

  function handleCardClick() {
    props.onCardClick(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  return(
    <div className="element">
      <img src={props.card.link} alt={props.card.name} className="element__image" onClick={handleCardClick} />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="element__container">
        <p className="element__title">{props.card.name}</p>
        <div className="element__like-container">
          <button type="button" className = {cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <span className="element__like-number">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card