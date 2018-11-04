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

  var container = document.querySelector('.map__filters-container');
  var render = function (item) {
    var pin = mapPinTemplate.cloneNode(true).content;
    pin.querySelector('.map__pin').style.left = item.location.x + 'px';
    pin.querySelector('.map__pin').style.top = item.location.y + 'px';
    pin.querySelector('img').src = item.author.avatar;
    pin.querySelector('img').alt = item.offer.title;
    pin.querySelector('.map__pin').addEventListener('click', function (evt) {
      evt.preventDefault();
      //  var card = document.createDocumentFragment();
      // card.appendChild(window.card.renderAdvert(item));
      var card = window.card.renderAdvert(item);
      var newElement = document.querySelector('.map');
      newElement.insertBefore(card, container);
      evt.currentTarget.classList.add('map__pin--active');
    });

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
      } else if (priceFilter.value === 'middle') {
        return (
          data.price > RangeOfPrice.LOW && data.price <= RangeOfPrice.MIDDLE
        );
      } else if (priceFilter.value === 'high') {
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

      for (var i = 0; i < featuresFilter.length; i++) {
        if (data.indexOf(featuresFilter[i].value) === -1) {
          return false;
        }
      }

      return true;
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
