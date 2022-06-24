export class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      authorization: "b3333a92-aa1e-4321-be00-eaab1687988b",
      "Content-Type": "application/json",
    };
  }

  /** Загрузка информации о пользователе с сервера. */

  getUserInfo() {
    return fetch("https://nomoreparties.co/v1/cohort-43/users/me", {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Возникла ошибка");
    });
  }

  /** Получение карточек с сервера. */
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Возникла ошибка");
    });
  }

  /** Редактирование профиля. */

  editUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: data.title, about: data.status }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Возникла ошибка");
    });
  }

  /** Добавление новой карточки. */

  addUserCard(item) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Возникла ошибка");
    });
  }

  /** Удаления карточки. */

  removeCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Возникла ошибка");
    });
  }

  /** Постановка и снятие лайка. */

  setLike(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Возникла ошибка");
    });
  }

  removeLike(data) {
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Возникла ошибка");
    });
  }

  /** Обновление аватара пользователя. */

  updateUserAvatar(item) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: item["edit-avatar"] }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Возникла ошибка");
    });
  }
}