//import { profileTitle, profileSubtitle } from "../utils/constants";

/*export class Api {
  constructor(url, token, groupId}) {
    this._url = url;
   // this._token = token;
   // this._groupId = groupId;
    this._headers =  {
      'Content-Type': 'application/json',
      'authorization': 'b3333a92-aa1e-4321-be00-eaab1687988b'
    }
  }*/



  export class Api {
    constructor(url) {
      this._url = url;
      this._headers =  {
        authorization: 'b3333a92-aa1e-4321-be00-eaab1687988b',
        'Content-Type': 'application/json',
      }
    }


  /** Загрузка информации о пользователе с сервера. */

  getUserInfo() {
    return fetch('https://nomoreparties.co/v1/cohort-43/users/me', {
      method: "GET",
      headers: this._headers})

      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Возникла ошибка')
      })  
     /* .then((item) => {
        
        profileTitle.textContent = item.name,  
        profileSubtitle.textContent = item.about
     //   profileAvatar.src = item.avatar
      
      })*/
  }




  /** Получение карточек с сервера. */
  getInitialCards() {
    return fetch(`${this._url}/cards`,{
      method: "GET",
      headers: this._headers})
      .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Возникла ошибка')
      })

  }
 
 
  /* getInitialCards() {
    return fetch(this._url, {
      method: "GET",
      headers: {
        'Content-type': 'application/json',
        'authorization': this._token
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject('Возникла ошибка')        
      });
  }*/

/** Редактирование профиля. */

editUserInfo (data) {
  return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({ name: data.title, about: data.status })
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject('Возникла ошибка')
  })
}


/** Добавление новой карточки. */

addUserCard(card) {
  return fetch(`${this._url}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      name: card.name, 
      link: card.link,
    })
  })
  .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject('Возникла ошибка')
  })
}

  
/** Отображение количества лайков карточки. */
//countLikes


/** Удаления карточки. */

removeCard(cardId) {
  return fetch(`${this._url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this._headers,  
  })
  .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject('Возникла ошибка')
  })
}


/** Постановка и снятие лайка. */

setLike(cardId) {
  return fetch(`${this._url}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: this._headers,
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject('Возникла ошибка')
    })  
}

removeLike(cardId) {
  return fetch(`${this._url}/cards/${cardId}/likes`, {
    method: 'DELETE',  
    headers: this._headers,
  })
    .then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject('Возникла ошибка')
    })  
}

/** Обновление аватара пользователя. */

  updateUserAvatar(avatarData) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: avatarData.link})
    })
    .then((res) => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject('Возникла ошибка')
    })
  }
}