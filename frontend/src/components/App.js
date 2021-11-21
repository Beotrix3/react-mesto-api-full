import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip.js';
import agree from '../images/agree.svg';
import disagree from '../images/disagree.svg';

function App() {
  const history = useHistory()

  const [loggedIn, setLoggedIn] = useState(false)
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false)
  const [message, setMessage] = useState({ image: '', text: '' })
  const [email, setEmail] = useState('')

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({})

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function onCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(null)
    setIsInfoTooltipOpen(false)
  }

  function onUpdateUser(userData) {
    api.setUserInfoApi(userData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function onUpdateAvatar(userData) {
    api.handleUserAvatar(userData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function handleCardLike(card) {
    // Проверка, есть ли лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    
    // Отправка запроса в API и получение обновлённых данных карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api.delete(card._id)
      .then(() => {
        setCards(cards.filter((i) => i !== card))
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(cardData) {
    api.addUserCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')
  
    if(jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if(res) {
            setLoggedIn(true)
            setEmail(res.data.email)
            history.push('/')
          }
        })
        .catch((err) => console.log(err))
    }
  }, [history])

  function handleAuthorization(password, email) {
    auth.authorize(password, email)
      .then((token) => {
        auth.getContent(token)
          .then((res) => {
            setEmail(res.data.email)
            setLoggedIn(true)
            history.push('/')
          })
      })
      .catch((err) => console.log(err))
  }

  function handleRegistration(password, email) {
    auth.register(password, email)
      .then((result) => {
        setEmail(result.data.email)
        setMessage({ image: agree, text: 'Вы успешно зарегистрировались!' })
      })
      .catch(() => setMessage({ image: disagree, text: 'Что-то пошло не так! Попробуйте ещё раз.' }))
      .finally(() => setIsInfoTooltipOpen(true))
  }

  function onSignOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          email={email}
          onSignOut={onSignOut}
        />

        <Switch>

          <ProtectedRoute 
            exact path='/'
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={onCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            cards={cards}
          />

          <Route path='/sign-in'>

            <Register 
              isOpen={isEditProfilePopupOpen}
              onRegister={handleRegistration}
              isInfoTooltipOpen={isInfoTooltipOpen}
            />

          </Route>

          <Route path='/sign-up'>

            <Login
              isOpen={isEditProfilePopupOpen}
              onAuth={handleAuthorization}
            />

          </Route>

        </Switch>
          
        <Footer />

        <InfoTooltip 
          name='tooltip'
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          title={message.text}
          image={message.image}
        />

        <PopupWithForm
          name={'verify-delete'}
          title={'Вы уверены?'}
          textOnButton={'Да'}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={onUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={onUpdateUser}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App