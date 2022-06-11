import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputSets = this._popupElement.querySelectorAll(".popup__input");
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
}