let editButton = document.querySelector('.profile__edit-button');
let modalWindow = document.querySelector('.popup');
let modalCloseBtn = modalWindow.querySelector('.popup__close');

function toggleModalWindow() {
  modalWindow.classList.toggle('popup_opened');
  nameInput.textContent = profileName.value;
  jobInput.textContent = profileStatus.value;
}

editButton.addEventListener('click', toggleModalWindow);
modalCloseBtn.addEventListener('click', toggleModalWindow);

let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__user-name');
let jobInput = document.querySelector('.popup__user-description');
let profileName = document.querySelector('.profile__title');
let profileStatus = document.querySelector('.profile__subtitle');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileStatus.textContent = jobInput.value;
    toggleModalWindow();  
}

formElement.addEventListener('submit', formSubmitHandler);