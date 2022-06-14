export class UserInfo {
  constructor(profileName, profileStatus) {
    this._title = document.querySelector(profileName);
    this._status = document.querySelector(profileStatus);
  }

  getUserInfo() {
    const data = {
      title: this._title.textContent,
      status: this._status.textContent,
    };
    return data;
  }

  setUserInfo(data) {
    this._title.textContent = data.title;
    this._status.textContent = data.status;
  }
}