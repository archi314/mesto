import { Popup } from "../components/Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, popupCardImageSelector, popupCardTextSelector) {
    super(popupSelector);
    this._popupCardImage = document.querySelector(popupCardImageSelector);
    this._popupCardText = document.querySelector(popupCardTextSelector);
  }

  open = (name, link) => {
    this._popupCardImage.src = link;
    this._popupCardImage.alt = name;
    this._popupCardText.textContent = name;

    super.open();
  };
}