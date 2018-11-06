'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var OfferTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var container = document.querySelector('.map__filters-container');
  var remove = function () {
    var cardElement = document.querySelector('.map__card');
    if (cardElement) {
      cardElement.remove();
      var mapPinElements = document.querySelectorAll(
          '.map__pin:not(.map__pin--main)'
      );
      mapPinElements.forEach(function (element) {
        element.classList.remove('map__pin--active');
      });
    }
  };

  var onPinClick = function (item) {
    return function (evt) {
      evt.preventDefault();
      var card = window.card.renderAdvert(item);
      var newElement = document.querySelector('.map');
      newElement.insertBefore(card, container);
      evt.currentTarget.classList.add('map__pin--active');
    };
  };
  var onPopupClose = function () {
    remove();
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      remove();
    }
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var renderAdvert = function (advert) {
    // сохранение шаблона всей карточки
    var adElement = document.querySelector('#card').cloneNode(true).content;
    // сохранение всех элементов Features
    var popupFeatures = adElement.querySelector('.popup__features');
    var elementFeature = popupFeatures.cloneNode(true);
    var data = advert.offer;
    var popupCloseElement = adElement.querySelector('.popup__close');
    remove();
    popupCloseElement.addEventListener('click', onPopupClose);
    document.addEventListener('keydown', onPopupEscPress);
    adElement.querySelector('.popup__title').textContent = data.title;
    adElement.querySelector('.popup__text--price').textContent =
      data.price + ' ₽/ночь';
    adElement.querySelector('.popup__type').textContent = OfferTypes[data.type];
    adElement.querySelector('.popup__text--capacity').textContent =
      data.rooms + ' комнаты для ' + data.guests + ' гостей';
    adElement.querySelector('.popup__text--time').textContent =
      'Заезд после ' + data.checkin + ', выезд до ' + data.checkout;
    popupFeatures.innerHTML = '';
    data.features.forEach(function (element) {
      var blockFeatures = elementFeature
        .querySelector('.popup__feature--' + element)
        .cloneNode(true);
      popupFeatures.appendChild(blockFeatures);
    });
    adElement.querySelector('.popup__description').textContent =
      data.description;
    data.photos.forEach(function (element) {
      var photoBlockTemplate = adElement
        .querySelector('.popup__photos img')
        .cloneNode(true);
      photoBlockTemplate.src = element;
      adElement.querySelector('.popup__photos').appendChild(photoBlockTemplate);
    });
    adElement.querySelector('.popup__photos img:nth-child(1)').remove();
    adElement.querySelector('.popup__avatar').src = advert.author.avatar;

    return adElement;
  };

  window.card = {
    renderAdvert: renderAdvert,
    remove: remove,
    onPinClick: onPinClick
  };
})();
