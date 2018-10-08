'use strict';
(function () {
  var pinsWidth = document.querySelector('.map__pins').offsetWidth;
  // var activeMapElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  // цена за ночь
  var priceElement = document.querySelector('#price');
  // тип жилья
  var typeElement = document.querySelector('#type');
  // количество комнат
  var roomNumberElement = document.querySelector('#room_number');
  // количество мест
  var capacityElement = document.querySelector('#capacity');
  // время заезда
  var timeinElement = document.querySelector('#timein');
  // время выезда
  var timeoutElement = document.querySelector('#timeout');
  var pinObjectTop = '';
  var pinObjectLeft = '';
  // var adFormElements = document.querySelectorAll('.ad-form__element');
  var addressElement = document.querySelector('#address');
  var widthOfPin = 40;
  var minCoordY = 130;
  var maxCoordY = 630;
  var minCoordX = 0;
  var maxCoordX = pinsWidth - widthOfPin;

  var minPriceOfType = {
    palace: '10000',
    flat: '1000',
    house: '5000',
    bungalo: '0'
  };

  // события  при нажатии мыши
  var mapPinElement = document.querySelector('.map__pin--main');
  // var pinObject = mapPinElement.getBoundingClientRect();

  mapPinElement.addEventListener('mousedown', function (evt) {
    // координаты пина
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinObjectTop = mapPinElement.offsetTop - shift.y;
      pinObjectLeft = mapPinElement.offsetLeft - shift.x;

      if (minCoordY < pinObjectTop && maxCoordY > pinObjectTop) {
        mapPinElement.style.top = pinObjectTop + 'px';

        if (minCoordX < pinObjectLeft && maxCoordX > pinObjectLeft) {
          mapPinElement.style.left = pinObjectLeft + 'px';
        }
      }
    };

    // события  при отпускании мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.map.onStart(upEvt);
      addressElement.value = pinObjectLeft + ', ' + pinObjectTop;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', onMouseUp);
  });

  // синхронизация типа жилья и минимальной цены
  typeElement.addEventListener('change', function () {
    priceElement.min = minPriceOfType[typeElement.value];
    priceElement.placeholder = minPriceOfType[typeElement.value];
  });

  // синхронизация времени выезда и времени заезда
  timeinElement.addEventListener('change', function () {
    timeoutElement.value = timeinElement.value;
  });

  // синхронизация  количества комнат и количества мест
  var valdityRoomCapacity = function () {
    var roomCount = roomNumberElement.value;
    var capacityCount = capacityElement.value;
    roomCount++;
    capacityCount++;
    if (roomCount >= capacityCount) {
      roomNumberElement.setCustomValidity('');
    } else {
      roomNumberElement.setCustomValidity(
          'Количество комнат не соответствует количеству гостей'
      );
    }
  };

  roomNumberElement.addEventListener('change', valdityRoomCapacity);
  capacityElement.addEventListener('change', valdityRoomCapacity);

  // отправка формы
  var buttonSubmit = document.querySelector('.ad-form__submit');
  buttonSubmit.addEventListener('click', function () {
    valdityRoomCapacity();
    adFormElement.action = 'https://js.dump.academy/keksobooking';
  });
})();
