import React from 'react'
import PopupWithForm from './PopupWithForm.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext)

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    // Запрет браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передача значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  } 

  return (
    <PopupWithForm 
      name={'edit-profile'}
      title={'Редактировать профиль'}
      textOnButton={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input value={name || ''} id="username" name="name" type="text" className="popup__info popup__info_type_name" placeholder="Имя" minLength="2" maxLength="40" required onChange={handleNameChange} />
      <span id="username-error" className="popup__input-error popupName-input-error"></span>
      <input value={description || ''} id="about" name="about" type="text" className="popup__info popup__info_type_description" placeholder="О себе" minLength="2" maxLength="200" required onChange={handleDescriptionChange} />
      <span id="about-error" className="popup__input-error popupDescription-input-error"></span>
    </PopupWithForm>
  )
}
export default EditProfilePopup