'use strict';
(function () {
  var activeMapElement = document.querySelector('.map');
  var mapPinElement = document.querySelector('.map__pin--main');

  var adFormElement = document.querySelector('.ad-form');
  var pinObject = mapPinElement.getBoundingClientRect();
  var addressElement = document.querySelector('#address');

  var selectElements = document.querySelectorAll(
      '.map__filters select, .map__filters input, .ad-form__element'
  );
  var adverts = [];

  //  обработка успешной загрузки объявлений
  var successHandlerLoad = function (advert) {
    window.map.adverts = advert;
  };
  // первоначальная загрузка и установка свойства disabled формам
  var onLoad = function () {
    addressElement.value =
      Math.round(pinObject.left) + ', ' + Math.round(pinObject.top);

    selectElements.forEach(function (element) {
      element.setAttribute('disabled', 'true');
    });

    window.backend.load(successHandlerLoad);
  };

  // перевод страницы, формы объявления в активный режим
  var setActiveMode = function () {
    activeMapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    addressElement.setAttribute('readonly', 'true');

    selectElements.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  onLoad();

  var onStart = function (upEvt) {
    upEvt.preventDefault();
    setActiveMode();
    window.pins.updateAdverts();
    addressElement.value =
      Math.round(pinObject.left) + ', ' + Math.round(pinObject.top);
  };

  window.map = {
    onStart: onStart,
    adverts: adverts,
    selectElements: selectElements
  };
})();
