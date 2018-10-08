'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var nameOfType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var renderAdvert = function (advert) {
    // сохранение шаблона всей карточки
    var adElement = document.querySelector('#card').cloneNode(true).content;
    // сохранение всех элементов Features
    var popupFeatures = adElement.querySelector('.popup__features');
    var elementFeature = popupFeatures.cloneNode(true);
    var data = advert.offer;
    adElement.querySelector('.popup__title').textContent = data.title;
    adElement.querySelector('.popup__text--price').textContent =
      data.price + ' ₽/ночь';
    adElement.querySelector('.popup__type').textContent = nameOfType[data.type];
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
    var popupCloseElement = adElement.querySelector('.popup__close');

    popupCloseElement.addEventListener('click', function () {
      var cardElement = document.querySelector('.map__card');
      cardElement.remove();
    });
    popupCloseElement.addEventListener('keydown', function (evt) {
      var cardElement = document.querySelector('.map__card');
      if (evt.keyCode === ESC_KEYCODE) {
        cardElement.remove();
      }
    });

    return adElement;
  };

  window.card = {
    renderAdvert: renderAdvert
  };
})();
