  
  const modalWindow = document.querySelector('.popup');
  const popupEdit = document.querySelector('.popup_place_edit');
  const popupAdd = document.querySelector('.popup_place_add');
  const popupPicture = document.querySelector('.popup_place_image');

  const closeEditPopup = popupEdit.querySelector('.popup__close');
  const closeAddPopup = popupAdd.querySelector('.popup__close');
  const closePicturePopup = popupPicture.querySelector('.popup__close');

  const popupEditForm = popupEdit.querySelector('.popup__form');
  const popupAddForm = popupAdd.querySelector('.popup__form');

  const nameInput = popupEdit.querySelector('.popup__input-name');
  const descriptionInput = popupEdit.querySelector('.popup__input-description');

  const profileName = document.querySelector('.profile__title');
  const profileStatus = document.querySelector('.profile__subtitle');

  const editButton = document.querySelector('.profile__edit-button');
  const addButton = document.querySelector('.profile__add-button');


// Открытие и закрытие попапов

  function openPopup(popup) {
    popup.classList.add('popup_opened');
  }
  
  function closePopup(popup) {
    popup.classList.remove('popup_opened');
  }

  editButton.addEventListener('click', function() {
    openPopup(popupEdit);
  });
  
  addButton.addEventListener('click', function() {
    openPopup(popupAdd);
  });
  
  closeEditPopup.addEventListener('click', function() {
    closePopup(popupEdit);
  });
  
  closeAddPopup.addEventListener('click', function() {
    closePopup(popupAdd);
  });

  
   // Редактирование профиля

   function formSubmitHandler (evt) { 
    evt.preventDefault();  
    profileName.textContent = nameInput.value; 
    profileStatus.textContent = descriptionInput.value; 
    closePopup(popupEdit); 
  } 

  popupEditForm.addEventListener('submit', formSubmitHandler);

   // Добавление карточек
   
   function createNewCard (evt) {
      evt.preventDefault();
      const addTitleInput = popupAdd.querySelector('.popup__input-name').value;
      const addLinkInput = popupAdd.querySelector('.popup__input-description').value;
      const newCard = getElement({name: addTitleInput, link: addLinkInput});
      cardsContainer.prepend(newCard);
      closePopup(popupAdd);
  }
  
  popupAdd.addEventListener('submit', createNewCard);

   
// Добавление карточек из массива на страницу

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const cardsContainer = document.querySelector(".elements");
const template = document.querySelector(".template")


function render() {
  const html = initialCards.map(getElement);
  cardsContainer.append(...html);
}

function getElement(item) {
  const getElementTemplate = template.content.cloneNode(true);
  const imageElement = getElementTemplate.querySelector('.element__image');
  const titleElement = getElementTemplate.querySelector('.element__title');
  const removeButton = getElementTemplate.querySelector(".element__busket-icon");
  const heartElement = getElementTemplate.querySelector('.element__heart-icon');
  
  titleElement.textContent = item.name;
  imageElement.src = item.link;
  imageElement.alt = item.name;


  // Удаление элементов
 
  removeButton.addEventListener('click', removeElement);

  function removeElement(evt) {
    const element = evt.target.closest('.element');
    element.remove();
}


  //Добавление лайка на страницу

  heartElement.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart-icon_active');
    });


//Увеличение картинки

const popupCardImage = document.querySelector('.popup__card-image');
const popupCardText = document.querySelector('.popup__card-text');

function openImage() {
  popupPicture.classList.add('popup_opened');
  popupCardImage.src = item.link;
  popupCardImage.alt = item.name;
  popupCardText.textContent = item.name;
}

  imageElement.addEventListener('click', openImage);
 
  closePicturePopup.addEventListener('click', function() {
    closePopup(popupPicture);
  });

  return getElementTemplate;
}

render();