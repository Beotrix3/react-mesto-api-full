export default function InfoTooltip({ isOpen, onClose, title, image }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <img src={image} alt={image} className="popup__tooltip" />
        <h2 className="popup__title popup__title_type_tooltip">{title}</h2>
      </div>
    </div>
  )
}