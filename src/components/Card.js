export class Card {
  constructor(
    data,
    templateSelector,
    { handleCardClick, handleLikeSet, handleLikeRemove, handleRemoveBusket },
    ownerId
  ) {
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
    this._handleLikeSet = handleLikeSet;
    this._handleLikeRemove = handleLikeRemove;
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

    this._setHeartState(this._isCardLiked());

    this._likeQuantity.textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._heartElement.addEventListener("click", () => {
      this._toggleHeart(this._data);
    });

    /** слушатель удаления картинки. */
    this._removeButton.addEventListener("click", () => {
      this._handleRemoveBusket(this._data);
    });

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
      this._removeButton.style.display = "none";
    }
  }

  clickLike() {
    this._buttonLike.classList.toggle("element__heart-icon_active");
  }

  updateLikes(likes) {
    this._likes = likes;
    this._likeQuantity.textContent = this._likes.length;
  }

  _isCardLiked() {
    return this._likes.some((like) => like._id === this._ownerId);
  }

  _toggleHeart = () => {
    if (this._isCardLiked()) {
      this._handleLikeRemove(this._data);
    } else {
      this._handleLikeSet(this._data);
    }
  };

  _setHeartState(state) {
    if (state) {
      this._heartElement.classList.add("element__heart-icon_active");
    } else {
      this._heartElement.classList.remove("element__heart-icon_active");
    }
  }

  addLike(like) {
    this._setHeartState(true);
    this.updateLikes(like);
  }

  removeLike(like) {
    this._setHeartState(false);
    this.updateLikes(like);
  }
}