'use strict';
(function () {
  var mapPinTemplate = document.querySelector('#pin');
  var similarListElement = document.querySelector('.map__pins');

  var RangeOfPrice = {
    lowMin: 0,
    lowMax: 10000,
    middleMin: 10000,
    middleMax: 50000,
    highMin: 50000
  };
  var filteredAdvert = [];
  // var adverts = [];
  var renderPins = function (item) {
    var pin = mapPinTemplate.cloneNode(true).content;
    pin.querySelector('.map__pin').style.left = item.location.x + 'px';
    pin.querySelector('.map__pin').style.top = item.location.y + 'px';
    pin.querySelector('img').src = item.author.avatar;
    pin.querySelector('img').alt = item.offer.title;
    pin.querySelector('.map__pin').addEventListener('click', function (evt) {
      evt.currentTarget.classList.add('map__pin--active');
      evt.preventDefault();
      var card = document.createDocumentFragment();
      card.appendChild(window.card.renderAdvert(item));

      var newElement = document.querySelector('.map');
      newElement.insertBefore(
          card,
          document.querySelector('.map__filters-container')
      );
    });

    return pin;
  };
  // отрисовка 8 меток

  var render = function (pins) {
    var fragment = document.createDocumentFragment();
    var mapPinsElement = document.querySelectorAll(
        '.map__pin:not(.map__pin--main)'
    );
    mapPinsElement.forEach(function (element) {
      element.remove();
    });
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPins(pins[i]));
    }
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
        return (
          data.price > RangeOfPrice.lowMin && data.price < RangeOfPrice.lowMax
        );
      } else if (priceFilter.value === 'middle') {
        return (
          data.price > RangeOfPrice.middleMin &&
          data.price <= RangeOfPrice.middleMax
        );
      } else if (priceFilter.value === 'high') {
        return data.price > RangeOfPrice.highMin;
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

    console.log('Adverts_pins', window.map.adverts);
    filteredAdvert = window.map.adverts
      .filter(filterType)
      .filter(filterPrice)
      .filter(filterRoom)
      .filter(filterGuests)
      .filter(filterFeatures)
      .slice(0, 5);

    render(filteredAdvert);
  };

  console.log('filteredAdvert', filteredAdvert);
  window.pins = {
    renderPins: renderPins,
    updateAdverts: updateAdverts
  };
})();
