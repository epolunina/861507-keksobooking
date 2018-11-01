'use strict';
(function () {
  var activeMapElement = document.querySelector('.map');
  var mapPinElement = document.querySelector('.map__pin--main');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var adFormElement = document.querySelector('.ad-form');
  var pinObject = mapPinElement.getBoundingClientRect();
  var addressElement = document.querySelector('#address');
  var errorEl = document.querySelector('.error__message');
  var mapFilter = document.querySelector('.map__filters');
  var selectElements = mapFilter.querySelectorAll('select, input');
  var adverts = [];

  //  обработка успешной загрузки объявлений
  var successHandlerLoad = function (advert) {
    adverts = advert;
    console.log('adverts', adverts);
  };
  // первоначальная загрузка и установка свойства disabled формам
  var onLoad = function () {
    addressElement.value =
      Math.round(pinObject.left) + ', ' + Math.round(pinObject.top);
    adFormElements.forEach(function (element) {
      element.setAttribute('disabled', 'true');
    });

    selectElements.forEach(function (element) {
      element.setAttribute('disabled', 'true');
    });

    window.backend.load(successHandlerLoad, errorHandlerLoad);

    console.log('adverts_load', adverts);
  };

  // перевод страницы, формы объявления в активный режим
  var setActiveMode = function () {
    activeMapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');
    addressElement.setAttribute('readonly', 'true');
    adFormElements.forEach(function (element) {
      element.removeAttribute('disabled');
    });
    selectElements.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  // обработка ошибки при не успешной загрузки объявлений
  var errorHandlerLoad = function () {
    var errorElementTempl = errorEl.cloneNode(true).content;
    var erElement = document.createDocumentFragment();
    erElement.appendChild(errorElementTempl);
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
    onStart: onStart
  };
})();
