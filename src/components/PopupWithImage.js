import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, popupCardImageSelector, popupCardTextSelector) {
    super(popupSelector);
    this._popupCardImage = this._popupElement.querySelector(popupCardImageSelector);
    this._popupCardText = this._popupElement.querySelector(popupCardTextSelector);
  }

  open = (name, link) => {
    this._popupCardImage.src = link;
    this._popupCardImage.alt = name;
    this._popupCardText.textContent = name;

    super.open();
  };
}