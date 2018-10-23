'use strict';
(function () {
  var mapPinTemplate = document.querySelector('#pin');
  var similarListElement = document.querySelector('.map__pins');

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
  var mapFilter = document.querySelector('.map__filter');
  var typeFilter = mapFilter.querySelector('#housing-type');
  var priceFilter = mapFilter.querySelector('#housing-price');
  var roomsFilter = mapFilter.querySelector('#housing-rooms');
  var guestsFilter = mapFilter.querySelector('#housing-guests');
  var updateAdverts = function () {
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

    var filteredAdvert = [];

    filteredAdvert = sameTypeArray.concat(
        samePriceArray,
        sameRoomsFilter,
        sameGuestsFilter
    );

    render(filteredAdvert);
  };

  window.pins = {
    render: render,
    renderPins: renderPins,
    updateAdverts: updateAdverts
  };
})();
