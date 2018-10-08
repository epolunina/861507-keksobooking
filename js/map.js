'use strict';
(function () {
  var activeMapElement = document.querySelector('.map');
  var mapPinElement = document.querySelector('.map__pin--main');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var adFormElement = document.querySelector('.ad-form');
  var pinObject = mapPinElement.getBoundingClientRect();
  var addressElement = document.querySelector('#address');

  // первоначальная загрузка и установка свойства disabled формам
  var onload = function () {
    addressElement.value =
      Math.round(pinObject.left) + ', ' + Math.round(pinObject.top);
    adFormElements.forEach(function (element) {
      element.setAttribute('disabled', 'true');
    });
  };

  // перевод страницы, формы объявления в активный режим
  var setup = function () {
    activeMapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    adFormElements.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  onload();

  var onStart = function (upEvt) {
    upEvt.preventDefault();
    setup();
    window.data.generateMockData();

    if (window.data.adverts.length < 9) {
      window.pins.render();
    }
    addressElement.value =
      Math.round(pinObject.left) + ', ' + Math.round(pinObject.top);
  };

  window.map = {
    onStart: onStart
  };
})();
