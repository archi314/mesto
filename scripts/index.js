import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popupEdit = document.querySelector(".popup_place_edit");
const popupAdd = document.querySelector(".popup_place_add");
const popupPicture = document.querySelector(".popup_place_image");

const popupEditForm = popupEdit.querySelector(".popup__form");
const popupAddForm = popupAdd.querySelector(".popup__form");

const nameInput = popupEdit.querySelector(".popup__input-name");
const descriptionInput = popupEdit.querySelector(".popup__input-description");

const profileName = document.querySelector(".profile__title");
const profileStatus = document.querySelector(".profile__subtitle");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const addTitleInput = popupAdd.querySelector(".popup__input-name");
const addLinkInput = popupAdd.querySelector(".popup__input-description");

const popupCardImage = document.querySelector(".popup__card-image");
const popupCardText = document.querySelector(".popup__card-text");

const popups = document.querySelectorAll(".popup");
const cardsContainer = document.querySelector(".elements");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error",
};

const cardFormValidator = new FormValidator(config, popupAddForm);
const profileFormValidator = new FormValidator(config, popupEditForm);
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();

 /** Открытие попапов. */

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}


function openAddWindow() {
  openPopup(popupAdd);
  cardFormValidator.toggleButtonState();
}

addButton.addEventListener("click", openAddWindow);


/** Закрытие попапа на оверлее и на значок закрытия. */

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});


/** Закрытие на событии esc. */

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModalWindow = document.querySelector(".popup_opened");
    closePopup(openedModalWindow);
  }
}

/** Редактирование профиля. */

function handleOpenProfile() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileStatus.textContent;
  openPopup(popupEdit);
}

editButton.addEventListener("click", handleOpenProfile);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = descriptionInput.value;
  closePopup(popupEdit);
}

popupEditForm.addEventListener("submit", handleProfileFormSubmit);

/** Добавление карточек. */
function addNewCard(evt) {
  evt.preventDefault();
  cardsContainer.prepend(
    createCard(
      {
        name: addTitleInput.value,
        link: addLinkInput.value,
      },
      ".template-elements",
      openImage
    )
  );
  popupAddForm.reset();
  closePopup(popupAdd);
}

popupAdd.addEventListener("submit", addNewCard);


/** Выгрузка карточек. */

function createCard(data, link, action) {
  const card = new Card(data, link, action);
  return card.generateCard();
}

initialCards.map((data) => {
  cardsContainer.append(createCard(data, ".template-elements", openImage));
});

/** Увеличение картинки. */

function openImage(name, link) {
  openPopup(popupPicture);
  popupCardImage.src = link;
  popupCardImage.alt = name;
  popupCardText.textContent = name;
}