import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandler }, formSelector) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(formSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputSets = this._popupElement.querySelectorAll(".popup__input");
    this._popupButton = this._popupElement.querySelector(".popup__button")
    this._popupButtonText = this._popupButton.textContent;
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputSets.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  // Изменяем состояние кнопки во время загрузки УЛУЧШИТЬ
  loading(isLoading) {
    if (isLoading) {
      this._popupButton.textContent = 'Сохранение...'
    } else {
      this._popupButton.textContent = this._popupButtonText;
    }
  }
}