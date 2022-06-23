export class Card {
  constructor(data, templateSelector, handleLikeClick, {handleCardClick, handleRemoveBusket}, ownerId) {
    this._data = data,
    this._link = data.link;
    this._name = data.name;

    this._id = data.owner._id;
    this._ownerId = ownerId;
    this._cardId = data._id;
    this._likes = data.likes;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._handleRemoveBusket = handleRemoveBusket;
    this._handleLikeClick = handleLikeClick;
  }

  _getElementTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getElementTemplate();

    this._imageElement = this._element.querySelector(".element__image");
    this._titleElement = this._element.querySelector(".element__title");
    this._removeButton = this._element.querySelector(".element__busket-icon");
    this._heartElement = this._element.querySelector(".element__heart-icon");
    this._likeQuantity = this._element.querySelector(".element__heart-counter");

    this._imageElement.src = this._link;
    this._titleElement.textContent = this._name;
    this._titleElement.alt = this._name;


    this._cardOwner();

    this._isCardLiked();

    
    this._likeQuantity.textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
  
  this._heartElement.addEventListener("click", () => {
    this._handleLikeClick(this);
  });

    /** слушатель удаления картинки. */
  this._removeButton.addEventListener('click', () => {
    this._handleRemoveBusket(this._data);
  })


/** Слушатель увеличения картинки */
    this._imageElement.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }


  _cardOwner() {
    if (this._id !== this._ownerId) {
      this._element.remove()
    }
  }

/** Проверка лайка. */ 

  _isCardLiked() {
    return this._likes.some((data) => {
      return data._id.includes(this._ownerId)
    });
  }

  clickOnLike() {
      this._buttonLike.classList.toggle('element__like_is-active');
    }

  updateLikes(likes) {
    this._likes = likes;
    this._likeQuantity.textContent = this._likes.length;
  }

  setLike(likes) {
    this._heartElement.classList.add("element__heart-icon_active");
    this.updateLikes(likes);
  }

  removeLike(likes) {
    this._heartElement.classList.remove("element__heart-icon_active");
    this.updateLikes(likes);
  }

}