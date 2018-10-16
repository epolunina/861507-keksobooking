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

  window.pins = {
    render: render,
    renderPins: renderPins
  };
})();
