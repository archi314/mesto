export class UserInfo {
  constructor(profileName, profileStatus) {
    this._name = document.querySelector(profileName);
    this._status = document.querySelector(profileStatus);
  }

  getUserInfo() {
    const data = {
      name: this._name.textContent,
      status: this._status.textContent,
    };
    return data;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._status.textContent = data.status;
  }
}