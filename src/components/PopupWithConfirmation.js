import { Popup }  from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.popup__form');
  }

 /** сабмит удаления карточки */
  submitItem(action) {
    this._handleSubmit = action;
  }

  /** слушатель удаления карточки */
  setEventListeners() { 
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmit();
    });
    super.setEventListeners();
  }
} 
