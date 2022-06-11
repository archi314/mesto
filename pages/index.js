import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";

import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

import {
  popupEdit,
  popupAdd,
  popupEditForm,
  popupAddForm,
  nameInput,
  descriptionInput,
  editButton,
  addButton,
  addTitleInput,
  addLinkInput,
  cardsContainer,
  initialCards,
  config,
} from "../utils/constants.js";


/** Валидация */

const cardFormValidator = new FormValidator(config, popupAddForm);
const profileFormValidator = new FormValidator(config, popupEditForm);
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();


/**Блок Card. Выгрузка карточек.*/

function createCard(data) {
  const card = new Card(data, ".template-elements", {
    handleCardClick: (name, link) => {
      popupOpenImage.open(name, link);
    },
  });
  return card.generateCard();
}


/** Блок Section. Рендеринг темплейта. */

const listContainer = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      listContainer.addItem(createCard(data));
    },
  },
  ".elements"
);

listContainer.renderItems();


// Блок UserInfo. Редактирование профиля.
const userInfo = new UserInfo(".profile__title", ".profile__subtitle");


/** Блоки PopupWithForm. */

/** Функциональность блока редактирования данных пользователя. */
const popupWithFormEdit = new PopupWithForm(".popup_place_edit", {
  submitHandler: (data) => {
    userInfo.setUserInfo(data);
    popupWithFormEdit.close();
  },
});

popupWithFormEdit.setEventListeners();

const changeProfileInfo = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  descriptionInput.value = userData.status;
};


/** Функциональность блока добавления новых карточек. */

const popupWithFormAdd = new PopupWithForm(
  ".popup_place_add",
  {
    submitHandler: () => {
      userInfo.getUserInfo();
      cardsContainer.prepend(
        createCard({
          name: addTitleInput.value,
          link: addLinkInput.value,
        })
      );
      popupWithFormAdd.close();
    },
  },
  ".popup__form_add"
);

popupWithFormAdd.setEventListeners();


/** Блок PopupWithImage. Увеличение картинки. */

const popupOpenImage = new PopupWithImage(
  ".popup_place_image",
  ".popup__card-image",
  ".popup__card-text"
);

popupOpenImage.setEventListeners();

/** Слушатели на кнопки. */

editButton.addEventListener("click", () => {
  popupWithFormEdit.open();
  changeProfileInfo();
});

addButton.addEventListener("click", () => {
  popupWithFormAdd.open();
  cardFormValidator.toggleButtonState();
});
