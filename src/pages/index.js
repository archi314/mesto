import "../pages/index.css";

import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

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
  popupRemoveCard,
  nameInput,
  descriptionInput,
  editButton,
  addButton,
  addTitleInput,
  addLinkInput,
  cardsContainer,
  popupEditAvatar,
  popupEditAvatarForm,
  editAvatarButton,
  popupAvatarInput,
  profileAvatar,
  initialCards,
  config,
} from "../utils/constants.js";

/** Api */

const api = new Api(
  "https://mesto.nomoreparties.co/v1/cohort-43",
  "b3333a92-aa1e-4321-be00-eaab1687988b"
);


let ownerId = null;


/** Валидация */

const cardFormValidator = new FormValidator(config, popupAddForm);
const profileFormValidator = new FormValidator(config, popupEditForm);
const avatarEditFormValidator = new FormValidator(config, popupEditAvatarForm);
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    ownerId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

/** Блок Section. Рендеринг темплейта. */

const cardList = new Section(
  {
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".elements"
);

/**Блок Card. Выгрузка карточек.*/

const createCard = (data) => {
  const card = new Card(
    data,
    ".template-elements",
    {
      handleCardClick: (name, link) => {
        popupOpenImage.open(name, link);
      },
      handleRemoveBusket: (cardElement) => {
        confirmationDeleteCard.open();
        confirmationDeleteCard.submitItem(() => {
          api
            .removeCard(cardElement)
            .then(() => {
              card.removeElement();
              confirmationDeleteCard.close();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      },

      handleLikeSet: (cardElement) => {
        api
          .setLike(cardElement)
          .then((res) => {
            card.addLike(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleLikeRemove: (cardElement) => {
        api
          .removeLike(cardElement)
          .then((res) => {
            card.removeLike(res.likes);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    ownerId
  );
  return card.generateCard();
};

/** Блок UserInfo. Редактирование профиля. */
const userInfo = new UserInfo(
  ".profile__title",
  ".profile__subtitle",
  ".profile__avatar"
);


/** Блоки PopupWithForm. */

/** Функциональность блока редактирования данных пользователя. */
const popupWithFormEdit = new PopupWithForm(".popup_place_edit", {
  submitHandler: (dataProfile) => {
    popupWithFormEdit.submitLoading(true);
    api
      .editUserInfo(dataProfile)
      .then((dataProfile) => {
        userInfo.setUserInfo(dataProfile);
        popupWithFormEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormEdit.submitLoading(false);
      });
  },
});

popupWithFormEdit.setEventListeners();

const changeProfileInfo = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.title;
  descriptionInput.value = userData.status;
};

/** Функциональность блока добавления новых карточек. */

const popupWithFormAdd = new PopupWithForm(".popup_place_add", {
  submitHandler: (item) => {
    popupWithFormAdd.submitLoading(true);
    api
      .addUserCard(item)
      .then((res) => {
        cardList.prependItem(createCard(res));
        popupWithFormAdd.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWithFormAdd.submitLoading(false);
      });
  },
});

popupWithFormAdd.setEventListeners();

/** Функциональность блока редактирования аватара пользователя. */

const editAvatarProfile = new PopupWithForm(".popup_type_edit-avatar", {
  submitHandler: (item) => {
    editAvatarProfile.submitLoading(true);
    api
      .updateUserAvatar(item)
      .then((res) => {
        userInfo.setUserInfo(res);
        editAvatarProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        editAvatarProfile.submitLoading(false);
      });
  },
});

editAvatarProfile.setEventListeners();

/** Функциональность блока подтверждения удаления карточки. */

const confirmationDeleteCard = new PopupWithConfirmation(
  ".popup_type_delete-confirmation"
);
confirmationDeleteCard.setEventListeners();

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
  profileFormValidator.resetValidation();
});

addButton.addEventListener("click", () => {
  popupWithFormAdd.open();
  cardFormValidator.resetValidation();
  cardFormValidator.toggleButtonState();
});

editAvatarButton.addEventListener("click", () => {
  editAvatarProfile.open();
  avatarEditFormValidator.resetValidation();
  avatarEditFormValidator.toggleButtonState();
});