'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var TIMEOUT = 500;

  var Value = {
    widthOfPin: '40',
    minCoordY: '130',
    maxCoordY: '630',
    minCoordX: '0',
    pinObjectTop: '375',
    pinObjectLeft: '570'
  };
  var MinPriceOfType = {
    palace: '10000',
    flat: '1000',
    house: '5000',
    bungalo: '0'
  };

  var pinsWidth = document.querySelector('.map__pins').offsetWidth;

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

  var addressElement = document.querySelector('#address');

  var maxCoordX = pinsWidth - Value.widthOfPin;

  var errorEl = document.querySelector('#error');

  var mainElement = document.querySelector('main');
  // события  при нажатии мыши
  var mapPinElement = document.querySelector('.map__pin--main');
  var buttonReset = document.querySelector('.ad-form__reset');
  var pinMainStartLeft = mapPinElement.style.left;
  var pinMainStartTop = mapPinElement.style.top;
  var activeMapElement = document.querySelector('.map');
  var adFormElements = document.querySelectorAll('.ad-form__element');

  var mapFilter = document.querySelector('.map__filters');

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

      Value.pinObjectTop = mapPinElement.offsetTop - shift.y;
      Value.pinObjectLeft = mapPinElement.offsetLeft - shift.x;

      if (
        Value.minCoordY < Value.pinObjectTop &&
        Value.maxCoordY > Value.pinObjectTop
      ) {
        mapPinElement.style.top = Value.pinObjectTop + 'px';

        if (
          Value.minCoordX < Value.pinObjectLeft &&
          maxCoordX > Value.pinObjectLeft
        ) {
          mapPinElement.style.left = Value.pinObjectLeft + 'px';
        }
      }
    };

    // события  при отпускании мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.map.onStart(upEvt);
      addressElement.value = Value.pinObjectLeft + ', ' + Value.pinObjectTop;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', onMouseUp);
  });

  var lastTimeout;
  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, TIMEOUT);
  };

  mapFilter.addEventListener('change', function () {
    window.card.remove();
    debounce(window.pins.updateAdverts);
  });

  // синхронизация типа жилья и минимальной цены
  typeElement.addEventListener('change', function () {
    priceElement.min = MinPriceOfType[typeElement.value];
    priceElement.placeholder = MinPriceOfType[typeElement.value];
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
    if (roomCount === 100 && capacityCount === 0) {
      roomNumberElement.setCustomValidity('');
    } else if (roomCount >= capacityCount) {
      roomNumberElement.setCustomValidity('');
    } else {
      roomNumberElement.setCustomValidity(
          'Количество комнат не соответствует количеству гостей'
      );
    }
  };

  roomNumberElement.addEventListener('change', valdityRoomCapacity);
  capacityElement.addEventListener('change', valdityRoomCapacity);

  // неактивный режим карты
  var setUnactiveMode = function () {
    activeMapElement.classList.add('map--faded');
    adFormElement.classList.add('ad-form--disabled');
    var selectElements = mapFilter.querySelectorAll('select, input');
    selectElements.forEach(function (element) {
      element.setAttribute('disabled', 'true');
    });
    adFormElements.forEach(function (element) {
      element.setAttribute('disabled', 'true');
    });
  };
  // возвращение в начальный режим
  var setStartMode = function () {
    var mapPinsElement = document.querySelectorAll(
        '.map__pin:not(.map__pin--main)'
    );
    mapPinsElement.forEach(function (element) {
      element.remove();
    });
    adFormElement.reset();
    window.card.remove();
    mapPinElement.style.left = pinMainStartLeft;
    mapPinElement.style.top = pinMainStartTop;

    addressElement.value =
      mapPinElement.offsetLeft + ', ' + mapPinElement.offsetTop;
    setUnactiveMode();
  };

  // добавление элемента с ошибкой
  var errorHandler = function () {
    var errorElementTempl = errorEl.cloneNode(true).content;
    var erElement = document.createDocumentFragment();
    erElement.appendChild(errorElementTempl);
    mainElement.appendChild(erElement);
    var errorElem = document.querySelector('.error');
    var onEscError = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        errorElem.remove();
      }
    };
    document.addEventListener('keydown', onEscError);
    document.removeEventListener('keydown', onEscError);

    errorElem.addEventListener('click', function () {
      errorElem.remove();
    });
    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      errorElem.remove();
    });
  };
  // добавление элемента об успехе
  var successEl = document.querySelector('#success');
  var successHandler = function () {
    var successElementTempl = successEl.cloneNode(true).content;
    var scElement = document.createDocumentFragment();
    scElement.appendChild(successElementTempl);
    mainElement.appendChild(scElement);
    var successElem = document.querySelector('.success');
    var onEscSuccess = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        successElem.remove();
      }
    };
    document.addEventListener('keydown', onEscSuccess);
    document.removeEventListener('keydown', onEscSuccess);
    successElem.addEventListener('click', function () {
      successElem.remove();
    });
    setStartMode();
  };
  // отправка формы
  var buttonSubmit = document.querySelector('.ad-form__submit');
  buttonSubmit.addEventListener('click', function () {
    valdityRoomCapacity();
  });
  buttonReset.addEventListener('click', function () {
    setStartMode();
  });
  adFormElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(
        new FormData(adFormElement),
        successHandler,
        errorHandler
    );
  });
})();
