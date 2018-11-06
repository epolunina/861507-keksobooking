'use strict';
(function () {
  var LIMIT = 5;
  var RangeOfPrice = {
    LOW: 10000,
    MIDDLE: 50000
  };

  var mapPinTemplate = document.querySelector('#pin');
  var similarListElement = document.querySelector('.map__pins');
  var roomsFilter = window.globals.mapFilter.querySelector('#housing-rooms');
  var guestsFilter = window.globals.mapFilter.querySelector('#housing-guests');
  var priceFilter = window.globals.mapFilter.querySelector('#housing-price');
  var featuresFilter = window.globals.mapFilter.querySelectorAll(
      '.map__features .map__checkbox'
  );

  var filteredAdvert = [];

  var render = function (item) {
    var pin = mapPinTemplate.content.cloneNode(true);
    var pinElement = pin.querySelector('.map__pin');
    var pinImg = pin.querySelector('img');
    pinElement.style.left = item.location.x + 'px';
    pinElement.style.top = item.location.y + 'px';
    pinImg.src = item.author.avatar;
    pinImg.alt = item.offer.title;
    pinElement.addEventListener('click', window.card.onPinClick(item));

    return pin;
  };
  // отрисовка 8 меток

  var remove = function () {
    var mapPinsElement = document.querySelectorAll(
        '.map__pin:not(.map__pin--main)'
    );
    mapPinsElement.forEach(function (element) {
      element.remove();
    });
  };

  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    remove();
    pins.forEach(function (element) {
      fragment.appendChild(render(element));
    });

    similarListElement.appendChild(fragment);
  };
  // var mapFilter = document.querySelector('.map__filters');

  var updateAdverts = function () {
    var filterType = function (it) {
      var typeFilter = window.globals.mapFilter.querySelector('#housing-type');
      var data = it.offer;
      return typeFilter.value === 'any' || typeFilter.value === data.type;
    };

    var filterPrice = function (it) {
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

      return (
        roomsFilter.value === 'any' ||
        parseInt(roomsFilter.value, 10) === data.rooms
      );
    };

    var filterGuests = function (it) {
      var data = it.offer;
      return (
        guestsFilter.value === 'any' ||
        data.guests === parseInt(guestsFilter.value, 10)
      );
    };

    var filterFeatures = function (it) {
      var data = it.offer.features;

      return Array.from(featuresFilter)
        .filter(function (item) {
          return item.checked;
        })
        .every(function (item) {
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
    remove: remove,
    updateAdverts: updateAdverts
  };
})();
