/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Api": () => (/* binding */ Api)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Api = /*#__PURE__*/function () {
  function Api(url) {
    _classCallCheck(this, Api);

    this._url = url;
    this._headers = {
      authorization: "b3333a92-aa1e-4321-be00-eaab1687988b",
      "Content-Type": "application/json"
    };
  }

  _createClass(Api, [{
    key: "_checkResponse",
    value: function _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430 ".concat(res.status));
    }
    /** Загрузка информации о пользователе с сервера. */

  }, {
    key: "getUserInfo",
    value: function getUserInfo() {
      return fetch("https://nomoreparties.co/v1/cohort-43/users/me", {
        method: "GET",
        headers: this._headers
      }).then(this._checkResponse);
    }
    /** Получение карточек с сервера. */

  }, {
    key: "getInitialCards",
    value: function getInitialCards() {
      return fetch("".concat(this._url, "/cards"), {
        method: "GET",
        headers: this._headers
      }).then(this._checkResponse);
    }
    /** Редактирование профиля. */

  }, {
    key: "editUserInfo",
    value: function editUserInfo(data) {
      return fetch("".concat(this._url, "/users/me"), {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.title,
          about: data.status
        })
      }).then(this._checkResponse);
    }
    /** Добавление новой карточки. */

  }, {
    key: "addUserCard",
    value: function addUserCard(item) {
      return fetch("".concat(this._url, "/cards"), {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: item.name,
          link: item.link
        })
      }).then(this._checkResponse);
    }
    /** Удаления карточки. */

  }, {
    key: "removeCard",
    value: function removeCard(data) {
      return fetch("".concat(this._url, "/cards/").concat(data._id), {
        method: "DELETE",
        headers: this._headers
      }).then(this._checkResponse);
    }
    /** Постановка и снятие лайка. */

  }, {
    key: "setLike",
    value: function setLike(data) {
      return fetch("".concat(this._url, "/cards/").concat(data._id, "/likes"), {
        method: "PUT",
        headers: this._headers
      }).then(this._checkResponse);
    }
  }, {
    key: "removeLike",
    value: function removeLike(data) {
      return fetch("".concat(this._url, "/cards/").concat(data._id, "/likes"), {
        method: "DELETE",
        headers: this._headers
      }).then(this._checkResponse);
    }
    /** Обновление аватара пользователя. */

  }, {
    key: "updateUserAvatar",
    value: function updateUserAvatar(item) {
      return fetch("".concat(this._url, "/users/me/avatar"), {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: item["edit-avatar"]
        })
      }).then(this._checkResponse);
    }
  }]);

  return Api;
}();

/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Card": () => (/* binding */ Card)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Card = /*#__PURE__*/function () {
  function Card(data, templateSelector, _ref, ownerId) {
    var _this = this;

    var handleCardClick = _ref.handleCardClick,
        handleLikeSet = _ref.handleLikeSet,
        handleLikeRemove = _ref.handleLikeRemove,
        handleRemoveBusket = _ref.handleRemoveBusket;

    _classCallCheck(this, Card);

    _defineProperty(this, "_toggleHeart", function () {
      if (_this._isCardLiked()) {
        _this._handleLikeRemove(_this._data);
      } else {
        _this._handleLikeSet(_this._data);
      }
    });

    this._data = data, this._link = data.link;
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

  _createClass(Card, [{
    key: "_getElementTemplate",
    value: function _getElementTemplate() {
      var cardElement = document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
      return cardElement;
    }
  }, {
    key: "generateCard",
    value: function generateCard() {
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
  }, {
    key: "_setEventListeners",
    value: function _setEventListeners() {
      var _this2 = this;

      this._heartElement.addEventListener("click", function () {
        _this2._toggleHeart(_this2._data);
      });
      /** слушатель удаления картинки. */


      this._removeButton.addEventListener("click", function () {
        _this2._handleRemoveBusket(_this2._data);
      });
      /** Слушатель увеличения картинки */


      this._imageElement.addEventListener("click", function () {
        _this2._handleCardClick(_this2._name, _this2._link);
      });
    }
  }, {
    key: "removeElement",
    value: function removeElement() {
      this._element.remove();

      this._element = null;
    }
  }, {
    key: "_cardOwner",
    value: function _cardOwner() {
      if (this._id !== this._ownerId) {
        this._removeButton.style.display = "none";
      }
    }
  }, {
    key: "clickLike",
    value: function clickLike() {
      this._buttonLike.classList.toggle("element__heart-icon_active");
    }
  }, {
    key: "updateLikes",
    value: function updateLikes(likes) {
      this._likes = likes;
      this._likeQuantity.textContent = this._likes.length;
    }
  }, {
    key: "_isCardLiked",
    value: function _isCardLiked() {
      var _this3 = this;

      return this._likes.some(function (like) {
        return like._id === _this3._ownerId;
      });
    }
  }, {
    key: "_setHeartState",
    value: function _setHeartState(state) {
      if (state) {
        this._heartElement.classList.add("element__heart-icon_active");
      } else {
        this._heartElement.classList.remove("element__heart-icon_active");
      }
    }
  }, {
    key: "addLike",
    value: function addLike(like) {
      this._setHeartState(true);

      this.updateLikes(like);
    }
  }, {
    key: "removeLike",
    value: function removeLike(like) {
      this._setHeartState(false);

      this.updateLikes(like);
    }
  }]);

  return Card;
}();

/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormValidator": () => (/* binding */ FormValidator)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FormValidator = /*#__PURE__*/function () {
  function FormValidator(config, formElement) {
    var _this = this;

    _classCallCheck(this, FormValidator);

    _defineProperty(this, "_showInputError", function (inputElement) {
      var errorElement = document.querySelector(".".concat(inputElement.id, "-error"));
      inputElement.classList.add(_this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(_this._errorClass);
    });

    _defineProperty(this, "_hideInputError", function (inputElement) {
      var errorElement = _this._formElement.querySelector("#".concat(inputElement.id, "-error"));

      errorElement.textContent = "";
      errorElement.classList.remove(_this._errorClass);
      inputElement.classList.remove(_this._inputErrorClass);
    });

    _defineProperty(this, "_isValid", function (inputElement) {
      if (!inputElement.validity.valid) {
        _this._showInputError(inputElement);
      } else {
        _this._hideInputError(inputElement);
      }
    });

    _defineProperty(this, "_setEventListeners", function () {
      _this._inputList.forEach(function (inputElement) {
        inputElement.addEventListener("input", function () {
          _this._isValid(inputElement);

          _this.toggleButtonState();
        });
      });
    });

    _defineProperty(this, "toggleButtonState", function () {
      _this._submitButtonElement.disabled = !_this._formElement.checkValidity();

      _this._submitButtonElement.classList.toggle(_this._inactiveButtonClass, !_this._formElement.checkValidity());
    });

    _defineProperty(this, "enableValidation", function () {
      _this._setEventListeners();
    });

    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _createClass(FormValidator, [{
    key: "_hasInvalidInput",
    value: function _hasInvalidInput() {
      return this._inputList.some(function (inputElement) {
        return !inputElement.validity.valid;
      });
    }
  }, {
    key: "resetValidation",
    value: function resetValidation() {
      var _this2 = this;

      this._inputList.forEach(function (inputElement) {
        _this2._hideInputError(inputElement);
      });
    }
  }]);

  return FormValidator;
}();

/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Popup": () => (/* binding */ Popup)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Popup = /*#__PURE__*/function () {
  function Popup(popupSelector) {
    var _this = this;

    _classCallCheck(this, Popup);

    _defineProperty(this, "_handleEscClose", function (evt) {
      if (evt.key === "Escape") {
        _this.close();
      }
    });

    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector(".popup__close");
  }
  /** Открытие попапа. */


  _createClass(Popup, [{
    key: "open",
    value: function open() {
      this._popupElement.classList.add("popup_opened");

      document.addEventListener("keydown", this._handleEscClose);
    }
    /** Закрытие попапа. */

  }, {
    key: "close",
    value: function close() {
      this._popupElement.classList.remove("popup_opened");

      document.removeEventListener("keydown", this._handleEscClose);
    }
    /** Закрытие на событии esc. */

  }, {
    key: "setEventListeners",
    value:
    /** Закрытие попапа на оверлее и на значок закрытия. */
    function setEventListeners() {
      var _this2 = this;

      this._popupElement.addEventListener("mousedown", function (evt) {
        if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close")) {
          _this2.close();
        }
      });
    }
  }]);

  return Popup;
}();

/***/ }),

/***/ "./src/components/PopupWithConfirmation.js":
/*!*************************************************!*\
  !*** ./src/components/PopupWithConfirmation.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopupWithConfirmation": () => (/* binding */ PopupWithConfirmation)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var PopupWithConfirmation = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithConfirmation, _Popup);

  var _super = _createSuper(PopupWithConfirmation);

  function PopupWithConfirmation(popupSelector) {
    var _this;

    _classCallCheck(this, PopupWithConfirmation);

    _this = _super.call(this, popupSelector);
    _this._form = _this._popupElement.querySelector(".popup__form");
    return _this;
  }
  /** сабмит удаления карточки */


  _createClass(PopupWithConfirmation, [{
    key: "submitItem",
    value: function submitItem(removing) {
      this._handleSubmit = removing;
    }
    /** слушатель удаления карточки */

  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this2 = this;

      this._form.addEventListener("submit", function (event) {
        event.preventDefault();

        _this2._handleSubmit();
      });

      _get(_getPrototypeOf(PopupWithConfirmation.prototype), "setEventListeners", this).call(this);
    }
  }]);

  return PopupWithConfirmation;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup);

/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopupWithForm": () => (/* binding */ PopupWithForm)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


var PopupWithForm = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithForm, _Popup);

  var _super = _createSuper(PopupWithForm);

  function PopupWithForm(popupSelector, _ref, formSelector) {
    var _this;

    var submitHandler = _ref.submitHandler;

    _classCallCheck(this, PopupWithForm);

    _this = _super.call(this, popupSelector);
    _this._form = _this._popupElement.querySelector(formSelector);
    _this._popupForm = _this._popupElement.querySelector(".popup__form");
    _this._inputSets = _this._popupElement.querySelectorAll(".popup__input");
    _this._popupButton = _this._popupElement.querySelector(".popup__button");
    _this._popupButtonText = _this._popupButton.textContent;
    _this._submitHandler = submitHandler;
    return _this;
  }

  _createClass(PopupWithForm, [{
    key: "_getInputValues",
    value: function _getInputValues() {
      var _this2 = this;

      this._formValues = {};

      this._inputSets.forEach(function (input) {
        return _this2._formValues[input.name] = input.value;
      });

      return this._formValues;
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this3 = this;

      _get(_getPrototypeOf(PopupWithForm.prototype), "setEventListeners", this).call(this);

      this._popupForm.addEventListener("submit", function (evt) {
        evt.preventDefault();

        _this3._submitHandler(_this3._getInputValues());
      });
    }
  }, {
    key: "close",
    value: function close() {
      _get(_getPrototypeOf(PopupWithForm.prototype), "close", this).call(this);

      this._popupForm.reset();
    }
  }, {
    key: "submitLoading",
    value: function submitLoading(data) {
      if (data) {
        this._popupButton.textContent = "Сохранение...";
      } else {
        this._popupButton.textContent = this._popupButtonText;
      }
    }
  }]);

  return PopupWithForm;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup);

/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PopupWithImage": () => (/* binding */ PopupWithImage)
/* harmony export */ });
/* harmony import */ var _components_Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Popup.js */ "./src/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var PopupWithImage = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithImage, _Popup);

  var _super = _createSuper(PopupWithImage);

  function PopupWithImage(popupSelector, popupCardImageSelector, popupCardTextSelector) {
    var _thisSuper, _this;

    _classCallCheck(this, PopupWithImage);

    _this = _super.call(this, popupSelector);

    _defineProperty(_assertThisInitialized(_this), "open", function (name, link) {
      _this._popupCardImage.src = link;
      _this._popupCardImage.alt = name;
      _this._popupCardText.textContent = name;

      _get((_thisSuper = _assertThisInitialized(_this), _getPrototypeOf(PopupWithImage.prototype)), "open", _thisSuper).call(_thisSuper);
    });

    _this._popupCardImage = _this._popupElement.querySelector(popupCardImageSelector);
    _this._popupCardText = _this._popupElement.querySelector(popupCardTextSelector);
    return _this;
  }

  return _createClass(PopupWithImage);
}(_components_Popup_js__WEBPACK_IMPORTED_MODULE_0__.Popup);

/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Section": () => (/* binding */ Section)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Section = /*#__PURE__*/function () {
  function Section(_ref, containerSelector) {
    var renderer = _ref.renderer;

    _classCallCheck(this, Section);

    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _createClass(Section, [{
    key: "renderItems",
    value: function renderItems(data) {
      var _this = this;

      data.forEach(function (item) {
        return _this._renderer(item);
      });
    }
  }, {
    key: "addItem",
    value: function addItem(element) {
      this._container.append(element);
    }
  }, {
    key: "prependItem",
    value: function prependItem(element) {
      this._container.prepend(element);
    }
  }]);

  return Section;
}();

/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserInfo": () => (/* binding */ UserInfo)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var UserInfo = /*#__PURE__*/function () {
  function UserInfo(profileName, profileStatus, profileAvatar) {
    _classCallCheck(this, UserInfo);

    this._title = document.querySelector(profileName);
    this._status = document.querySelector(profileStatus);
    this._avatar = document.querySelector(profileAvatar);
  }

  _createClass(UserInfo, [{
    key: "getUserInfo",
    value: function getUserInfo() {
      var item = {
        title: this._title.textContent,
        status: this._status.textContent
      };
      return item;
    }
  }, {
    key: "setUserInfo",
    value: function setUserInfo(data) {
      this._title.textContent = data.name;
      this._status.textContent = data.about;
      this._avatar.src = data.avatar;
    }
  }, {
    key: "setUserAvatar",
    value: function setUserAvatar(avatar) {
      this._avatar.src = avatar;
    }
  }, {
    key: "getUserAvatar",
    value: function getUserAvatar() {
      user.avatar = this._avatar.src;
    }
  }]);

  return UserInfo;
}();

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addButton": () => (/* binding */ addButton),
/* harmony export */   "addLinkInput": () => (/* binding */ addLinkInput),
/* harmony export */   "addTitleInput": () => (/* binding */ addTitleInput),
/* harmony export */   "cardsContainer": () => (/* binding */ cardsContainer),
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "descriptionInput": () => (/* binding */ descriptionInput),
/* harmony export */   "editAvatarButton": () => (/* binding */ editAvatarButton),
/* harmony export */   "editButton": () => (/* binding */ editButton),
/* harmony export */   "initialCards": () => (/* binding */ initialCards),
/* harmony export */   "nameInput": () => (/* binding */ nameInput),
/* harmony export */   "popupAdd": () => (/* binding */ popupAdd),
/* harmony export */   "popupAddForm": () => (/* binding */ popupAddForm),
/* harmony export */   "popupAvatarInput": () => (/* binding */ popupAvatarInput),
/* harmony export */   "popupEdit": () => (/* binding */ popupEdit),
/* harmony export */   "popupEditAvatar": () => (/* binding */ popupEditAvatar),
/* harmony export */   "popupEditAvatarForm": () => (/* binding */ popupEditAvatarForm),
/* harmony export */   "popupEditForm": () => (/* binding */ popupEditForm),
/* harmony export */   "popupRemoveCard": () => (/* binding */ popupRemoveCard),
/* harmony export */   "profileAvatar": () => (/* binding */ profileAvatar),
/* harmony export */   "profileSubtitle": () => (/* binding */ profileSubtitle),
/* harmony export */   "profileTitle": () => (/* binding */ profileTitle)
/* harmony export */ });

var popupEdit = document.querySelector(".popup_place_edit");
var popupAdd = document.querySelector(".popup_place_add");
var popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
var popupRemoveCard = document.querySelector(".popup_type_delete-confirmation");
var popupEditForm = popupEdit.querySelector(".popup__form");
var popupAddForm = popupAdd.querySelector(".popup__form");
var popupEditAvatarForm = popupEditAvatar.querySelector(".popup__form");
var nameInput = popupEdit.querySelector(".popup__input-name");
var descriptionInput = popupEdit.querySelector(".popup__input-description");
var popupAvatarInput = popupEditAvatar.querySelector(".popup__input-avatar");
var editButton = document.querySelector(".profile__edit-button");
var addButton = document.querySelector(".profile__add-button");
var editAvatarButton = document.querySelector(".profile__edit-avatar-button");
var addTitleInput = popupAdd.querySelector(".popup__input-name");
var addLinkInput = popupAdd.querySelector(".popup__input-description");
var cardsContainer = document.querySelector(".elements");
var profileAvatar = popupEditAvatar.querySelector(".profile__avatar");
var profileTitle = document.querySelector(".profile__title");
var profileSubtitle = document.querySelector(".profile__subtitle");
var initialCards = [{
  name: "Архыз",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
}, {
  name: "Челябинская область",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
}, {
  name: "Иваново",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
}, {
  name: "Камчатка",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
}, {
  name: "Холмогорский район",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
}, {
  name: "Байкал",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
}];
var config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error"
};

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/index.css */ "./src/pages/index.css");
/* harmony import */ var _components_Api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Api.js */ "./src/components/Api.js");
/* harmony import */ var _components_PopupWithConfirmation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/PopupWithConfirmation.js */ "./src/components/PopupWithConfirmation.js");
/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Card.js */ "./src/components/Card.js");
/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/FormValidator.js */ "./src/components/FormValidator.js");
/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/PopupWithImage.js */ "./src/components/PopupWithImage.js");
/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/PopupWithForm.js */ "./src/components/PopupWithForm.js");
/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/UserInfo.js */ "./src/components/UserInfo.js");
/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Section.js */ "./src/components/Section.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/constants.js */ "./src/utils/constants.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }











/** Api */

var api = new _components_Api_js__WEBPACK_IMPORTED_MODULE_1__.Api("https://mesto.nomoreparties.co/v1/cohort-43", "b3333a92-aa1e-4321-be00-eaab1687988b");
var ownerId = null;
/** Валидация */

var cardFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_4__.FormValidator(_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.config, _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.popupAddForm);
var profileFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_4__.FormValidator(_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.config, _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.popupEditForm);
var avatarEditFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_4__.FormValidator(_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.config, _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.popupEditAvatarForm);
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();
Promise.all([api.getUserInfo(), api.getInitialCards()]).then(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      userData = _ref2[0],
      cards = _ref2[1];

  ownerId = userData._id;
  userInfo.setUserInfo(userData);
  userInfo.setUserAvatar(userData.avatar);
  cardList.renderItems(cards);
}).catch(function (err) {
  console.log(err);
});
/** Блок Section. Рендеринг темплейта. */

var cardList = new _components_Section_js__WEBPACK_IMPORTED_MODULE_8__.Section({
  renderer: function renderer(data) {
    cardList.addItem(createCard(data));
  }
}, ".elements");
/**Блок Card. Выгрузка карточек.*/

var createCard = function createCard(data) {
  var card = new _components_Card_js__WEBPACK_IMPORTED_MODULE_3__.Card(data, ".template-elements", {
    handleCardClick: function handleCardClick(name, link) {
      popupOpenImage.open(name, link);
    },
    handleRemoveBusket: function handleRemoveBusket(cardElement) {
      confirmationDeleteCard.open();
      confirmationDeleteCard.submitItem(function () {
        api.removeCard(cardElement).then(function () {
          card.removeElement();
          confirmationDeleteCard.close();
        }).catch(function (err) {
          console.log(err);
        });
      });
    },
    handleLikeSet: function handleLikeSet(cardElement) {
      api.setLike(cardElement).then(function (res) {
        card.addLike(res.likes);
      }).catch(function (err) {
        console.log(err);
      });
    },
    handleLikeRemove: function handleLikeRemove(cardElement) {
      api.removeLike(cardElement).then(function (res) {
        card.removeLike(res.likes);
      }).catch(function (err) {
        console.log(err);
      });
    }
  }, ownerId);
  return card.generateCard();
};
/** Блок UserInfo. Редактирование профиля. */


var userInfo = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_7__.UserInfo(".profile__title", ".profile__subtitle", ".profile__avatar");
/** Блоки PopupWithForm. */

/** Функциональность блока редактирования данных пользователя. */

var popupWithFormEdit = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__.PopupWithForm(".popup_place_edit", {
  submitHandler: function submitHandler(dataProfile) {
    popupWithFormEdit.submitLoading(true);
    api.editUserInfo(dataProfile).then(function (dataProfile) {
      userInfo.setUserInfo(dataProfile);
      popupWithFormEdit.close();
    }).catch(function (err) {
      console.log(err);
    }).finally(function () {
      popupWithFormEdit.submitLoading(false);
    });
  }
});
popupWithFormEdit.setEventListeners();

var changeProfileInfo = function changeProfileInfo() {
  var userData = userInfo.getUserInfo();
  _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.nameInput.value = userData.title;
  _utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.descriptionInput.value = userData.status;
};
/** Функциональность блока добавления новых карточек. */


var popupWithFormAdd = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__.PopupWithForm(".popup_place_add", {
  submitHandler: function submitHandler(item) {
    popupWithFormAdd.submitLoading(true);
    api.addUserCard(item).then(function (res) {
      cardList.prependItem(createCard(res));
      popupWithFormAdd.close();
    }).catch(function (err) {
      console.log(err);
    }).finally(function () {
      popupWithFormAdd.submitLoading(false);
    });
  }
});
popupWithFormAdd.setEventListeners();
/** Функциональность блока редактирования аватара пользователя. */

var editAvatarProfile = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_6__.PopupWithForm(".popup_type_edit-avatar", {
  submitHandler: function submitHandler(item) {
    editAvatarProfile.submitLoading(true);
    api.updateUserAvatar(item).then(function (res) {
      userInfo.setUserInfo(res);
      editAvatarProfile.close();
    }).catch(function (err) {
      console.log(err);
    }).finally(function () {
      editAvatarProfile.submitLoading(false);
    });
  }
});
editAvatarProfile.setEventListeners();
/** Функциональность блока подтверждения удаления карточки. */

var confirmationDeleteCard = new _components_PopupWithConfirmation_js__WEBPACK_IMPORTED_MODULE_2__.PopupWithConfirmation(".popup_type_delete-confirmation");
confirmationDeleteCard.setEventListeners();
/** Блок PopupWithImage. Увеличение картинки. */

var popupOpenImage = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_5__.PopupWithImage(".popup_place_image", ".popup__card-image", ".popup__card-text");
popupOpenImage.setEventListeners();
/** Слушатели на кнопки. */

_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.editButton.addEventListener("click", function () {
  popupWithFormEdit.open();
  changeProfileInfo();
  profileFormValidator.resetValidation();
});
_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.addButton.addEventListener("click", function () {
  popupWithFormAdd.open();
  cardFormValidator.resetValidation();
  cardFormValidator.toggleButtonState();
});
_utils_constants_js__WEBPACK_IMPORTED_MODULE_9__.editAvatarButton.addEventListener("click", function () {
  editAvatarProfile.open();
  avatarEditFormValidator.resetValidation();
  avatarEditFormValidator.toggleButtonState();
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map