function PopupWithForm({ name, title, isOpen, children, onSubmit, textOnButton, onClose }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <form name={name} className="popup__container" noValidate onSubmit={onSubmit}>
        <button type="button" className="popup__close-button popup__close-button_edit-profile" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" className="popup__save-button" value="Сохранить">{textOnButton}</button>
      </form>
    </div>
  )
}

export default PopupWithForm