export class Card {
  constructor(data, templateSelector, openImage) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._openImage = openImage;
  }

  _getElementTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getElementTemplate();

    this._imageElement = this._element.querySelector(".element__image");
    this._titleElement = this._element.querySelector(".element__title");
    this._removeButton = this._element.querySelector(".element__busket-icon");
    this._heartElement = this._element.querySelector(".element__heart-icon");

    this._imageElement.src = this._link;
    this._titleElement.textContent = this._name;
    this._titleElement.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._heartElement.addEventListener("click", () => this._clickHeart());
    this._removeButton.addEventListener("click", () => this._removeElement());

    this._imageElement.addEventListener("click", () => {
      this._openImage(this._name, this._link);
    });
  }

  _clickHeart() {
    this._heartElement.classList.toggle("element__heart-icon_active");
  }

  _removeElement() {
    this._element.remove();
    this._element = null;
  }
}