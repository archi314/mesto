const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error",
};

const showInputError = (config, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
  inputElement.classList.remove(config.inputErrorClass);
};

const isValid = (config, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      config,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(config, formElement, inputElement);
  }
};

function setEventListeners(config, formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  const submitButtonElement = formElement.querySelector(
    config.submitButtonSelector
  );

  toggleButtonState(config, inputList, submitButtonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(config, formElement, inputElement);

      toggleButtonState(config, inputList, submitButtonElement);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(config, formElement);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(config, inputList, submitButtonElement) {
  if (hasInvalidInput(inputList)) {
    submitButtonElement.classList.add(config.inactiveButtonClass);
    submitButtonElement.setAttribute("disabled", true);
  } else {
    submitButtonElement.classList.remove(config.inactiveButtonClass);
    submitButtonElement.removeAttribute("disabled", true);
  }
}

enableValidation(config);