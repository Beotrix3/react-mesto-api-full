class Api {
  constructor(options) {
    this._url = options.url
    this._headers = options.headers
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
      credentials: 'include',
      method: 'GET',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      credentials: 'include',
      method: 'GET',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  setUserInfoApi(userData) {
    return fetch(this._url + '/users/me', {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this._handleResponse)
  }

  handleUserAvatar(data) {
    return fetch(this._url + `/users/me/avatar`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._handleResponse)
  }

  addUserCard(data) {
    return fetch(this._url + '/cards', {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(this._handleResponse)
  }

  delete(id) {
    return fetch(this._url + `/cards/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(this._url + `/cards/likes/${id}`, {
      credentials: 'include',
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  getData() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }
}

const api = new Api({
  url: 'https://api.mesto.beotrix.nomoredomains.rocks',
  credentials: 'include',
  headers: {
    "authorization": '442d7c15-d132-449b-929f-8694ae0bf753',
    'Content-Type': 'application/json'
  }
})

export default api