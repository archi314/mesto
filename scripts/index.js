let editButton = document.querySelector('.profile__edit-button');
let modalWindow = document.querySelector('.popup');
let modalCloseBtn = modalWindow.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form'); 
let nameInput = document.querySelector('.popup__user-name'); 
let jobInput = document.querySelector('.popup__user-description'); 
let profileName = document.querySelector('.profile__title'); 
let profileStatus = document.querySelector('.profile__subtitle'); 


function toggleModalWindow() { 
  modalWindow.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileStatus.textContent;
  }
}

editButton.addEventListener('click', toggleModalWindow);
modalCloseBtn.addEventListener('click', toggleModalWindow);

function formSubmitHandler (evt) { 
  evt.preventDefault();  
  profileName.textContent = nameInput.value; 
  profileStatus.textContent = jobInput.value; 
  toggleModalWindow();   
} 

formElement.addEventListener('submit', formSubmitHandler);