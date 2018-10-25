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

  var renderPins = function (item) {
    var pin = mapPinTemplate.cloneNode(true).content;
    pin.querySelector('.map__pin').style.left = item.location.x + 'px';
    pin.querySelector('.map__pin').style.top = item.location.y + 'px';
    pin.querySelector('img').src = item.author.avatar;
    pin.querySelector('img').alt = item.offer.title;
    pin.querySelector('.map__pin').addEventListener('click', function (evt) {
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

  var render = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.adverts.length; i++) {
      fragment.appendChild(renderPins(window.data.adverts[i]));
    }
    similarListElement.appendChild(fragment);
  };
  var mapFilter = document.querySelector('.map__filters');
  var typeFilter = mapFilter.querySelector('#housing-type');
  // var priceFilter = mapFilter.querySelector('#housing-price');
  var roomsFilter = mapFilter.querySelector('#housing-rooms');
  var guestsFilter = mapFilter.querySelector('#housing-guests');
  var featuresFilter = mapFilter.querySelector(
      '.map__checkbox visually-hidden'
  );
  var updateAdverts = function () {
    var filterType = function (it) {
      var data = it.offer;
      return typeFilter.value === 'any' || data.type === typeFilter.value;
    };
    console.log('typeFilter.value', typeFilter.value);

    /*
    var filterPrice = function (it) {
      if (it.price > RangeOfPrice.lowMin && it.price < RangeOfPrice.lowMax) {
        return it.price;
      } else if (
        it.price > RangeOfPrice.middleMin &&
        it.price < RangeOfPrice.middleMax
      ) {
        return it.price;
      } else if (it.price > RangeOfPrice.highMin) {
        return it.price;
      }
         };
    */
    var filterRoom = function (it) {
      var data = it.offer;
      return roomsFilter.value === 'any' || data.rooms === roomsFilter.value;
    };
    console.log('roomsFilter.value', roomsFilter.value);

    var filterGuests = function (it) {
      var data = it.offer;
      return guestsFilter.value === 'any' || data.guests === guestsFilter.value;
    };

    console.log('guestsFilter.value', guestsFilter.value);

    var filterFeatures = function (it) {
      var data = it.offer;
      if (featuresFilter.checked) {
        return data.features === featuresFilter.value;
      }
    };

    var filteredAdvert = [];
    filteredAdvert = window.data.adverts
      .filter(filterType)
      //  .filter(filterPrice)
      .filter(filterRoom)
      .filter(filterGuests)
      .filter(filterFeatures)
      .slice(0, 5);
    console.log('filteredAdvert', filteredAdvert[0]);

    // render(filteredAdvert);
  };

  window.pins = {
    render: render,
    renderPins: renderPins,
    updateAdverts: updateAdverts
  };
})();

/*
    var sameTypeArray = window.data.adverts.filter(function (it) {
      return it.type === typeFilter.value;
    });
    var samePriceArray = window.data.adverts.filter(function (it) {
      return it.price === priceFilter.value;
    });
    var sameRoomsFilter = window.data.adverts.filter(function (it) {
      return it.rooms === roomsFilter.value;
    });
    var sameGuestsFilter = window.data.adverts.filter(function (it) {
      return it.guests === guestsFilter.value;
    });


   filteredAdvert = sameTypeArray.concat(
        samePriceArray,
      sameRoomsFilter,
     sameGuestsFilter
    );
*/
