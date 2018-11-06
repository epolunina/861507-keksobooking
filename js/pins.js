'use strict';
(function () {
  var LIMIT = 5;
  var RangeOfPrice = {
    LOW: 10000,
    MIDDLE: 50000
  };

  var mapPinTemplate = document.querySelector('#pin');
  var similarListElement = document.querySelector('.map__pins');
  var filteredAdvert = [];

  var render = function (item) {
    var pin = mapPinTemplate.cloneNode(true).content;
    pin.querySelector('.map__pin').style.left = item.location.x + 'px';
    pin.querySelector('.map__pin').style.top = item.location.y + 'px';
    pin.querySelector('img').src = item.author.avatar;
    pin.querySelector('img').alt = item.offer.title;
    pin
      .querySelector('.map__pin')
      .addEventListener('click', window.card.onPinClick(item));

    return pin;
  };
  // отрисовка 8 меток

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    var mapPinsElement = document.querySelectorAll(
        '.map__pin:not(.map__pin--main)'
    );
    mapPinsElement.forEach(function (element) {
      element.remove();
    });

    pins.forEach(function (element) {
      fragment.appendChild(render(element));
    });

    similarListElement.appendChild(fragment);
  };
  var mapFilter = document.querySelector('.map__filters');

  var updateAdverts = function () {
    var filterType = function (it) {
      var typeFilter = mapFilter.querySelector('#housing-type');
      var data = it.offer;
      return typeFilter.value === 'any' || typeFilter.value === data.type;
    };

    var filterPrice = function (it) {
      var priceFilter = mapFilter.querySelector('#housing-price');
      var data = it.offer;
      if (priceFilter.value === 'low') {
        return data.price < RangeOfPrice.LOW;
      }
      if (priceFilter.value === 'middle') {
        return (
          data.price > RangeOfPrice.LOW && data.price <= RangeOfPrice.MIDDLE
        );
      }
      if (priceFilter.value === 'high') {
        return data.price > RangeOfPrice.MIDDLE;
      }
      return true;
    };

    var filterRoom = function (it) {
      var data = it.offer;
      var roomsFilter = mapFilter.querySelector('#housing-rooms');
      return (
        roomsFilter.value === 'any' ||
        parseInt(roomsFilter.value, 10) === data.rooms
      );
    };

    var filterGuests = function (it) {
      var guestsFilter = mapFilter.querySelector('#housing-guests');
      var data = it.offer;
      return (
        guestsFilter.value === 'any' ||
        data.guests === parseInt(guestsFilter.value, 10)
      );
    };

    var filterFeatures = function (it) {
      var featuresFilter = mapFilter.querySelectorAll(
          '.map__features .map__checkbox:checked'
      );
      var data = it.offer.features;

      return Array.from(featuresFilter).every(function (item) {
        return data.indexOf(item.value) !== -1;
      });
    };

    filteredAdvert = window.map.adverts
      .filter(filterType)
      .filter(filterPrice)
      .filter(filterRoom)
      .filter(filterGuests)
      .filter(filterFeatures)
      .slice(0, LIMIT);

    renderPins(filteredAdvert);
  };

  window.pins = {
    render: render,
    updateAdverts: updateAdverts
  };
})();
