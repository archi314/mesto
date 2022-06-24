export class UserInfo {
  constructor(profileName, profileStatus, profileAvatar) {
    this._title = document.querySelector(profileName);
    this._status = document.querySelector(profileStatus);
    this._avatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    const item = {
      title: this._title.textContent,
      status: this._status.textContent,
    };
    return item;
  }

  setUserInfo(data) {
    this._title.textContent = data.name;
    this._status.textContent = data.about;
    this._avatar.src = data.avatar;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }

  getUserAvatar() {
    user.avatar = this._avatar.src;
  }
}