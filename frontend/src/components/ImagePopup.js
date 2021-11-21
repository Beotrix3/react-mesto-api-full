function ImagePopup(props) {
  return (
    <div className={`popup ${props.card ? 'popup_opened' : ''}`}>
      <figure className="popup__figure">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card ? props.card.link : '#'} alt={props.card ? props.card.name : ''} />
        <figcaption className="popup__caption">{props.card ? props.card.name : ''}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup