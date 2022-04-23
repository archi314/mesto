const modalWindow = document.querySelector(".popup");
const popupEdit = document.querySelector(".popup_place_edit");
const popupAdd = document.querySelector(".popup_place_add");
const popupPicture = document.querySelector(".popup_place_image");

const closeEditPopup = popupEdit.querySelector(".popup__close");
const closeAddPopup = popupAdd.querySelector(".popup__close");
const closePicturePopup = popupPicture.querySelector(".popup__close");

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

// Открытие и закрытие попапов

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

addButton.addEventListener("click", function () {
  openPopup(popupAdd);
});

closeEditPopup.addEventListener("click", function () {
  closePopup(popupEdit);
});

closeAddPopup.addEventListener("click", function () {
  closePopup(popupAdd);
});

closePicturePopup.addEventListener("click", function () {
  closePopup(popupPicture);
});


// Редактирование профиля

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


// Добавление карточек

function createNewCard(evt) {
  evt.preventDefault();
  const newCard = getElement({
    name: addTitleInput.value,
    link: addLinkInput.value,
  });
  cardsContainer.prepend(newCard);
  popupAddForm.reset();
  closePopup(popupAdd);
}
popupAdd.addEventListener("submit", createNewCard);


//Удаление элементов

function removeElement(evt) {
  const element = evt.target.closest(".element");
  element.remove();
}


//Добавление лайка на страницу

function clickHeart(evt) {
  evt.target.classList.toggle("element__heart-icon_active");
}


// Добавление карточек из массива на страницу

const cardsContainer = document.querySelector(".elements");
const template = document.querySelector(".template");

function render() {
  const cards = initialCards.map(getElement);
  cardsContainer.append(...cards);
}

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const imageElement = getElementTemplate.querySelector(".element__image");
  const titleElement = getElementTemplate.querySelector(".element__title");
  const removeButton = getElementTemplate.querySelector(".element__busket-icon");
  const heartElement = getElementTemplate.querySelector(".element__heart-icon");

  titleElement.textContent = item.name;
  imageElement.src = item.link;
  imageElement.alt = item.name;

  removeButton.addEventListener("click", removeElement); // Удаление элементов

  heartElement.addEventListener("click", clickHeart); //Добавление лайка на страницу


  //Увеличение картинки

  const popupCardImage = document.querySelector(".popup__card-image");
  const popupCardText = document.querySelector(".popup__card-text");

  function openImage() {
    openPopup(popupPicture);
    popupCardImage.src = item.link;
    popupCardImage.alt = item.name;
    popupCardText.textContent = item.name;
  }

  imageElement.addEventListener("click", openImage);

  return getElementTemplate;
}

render();
