'use strict';
var arrayTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var arrayTypes = ['palace', 'flat', 'house', 'bungalo'];
var arrayCheckins = ['12:00', '13:00', '14:00'];
var arrayCheckouts = ['12:00', '13:00', '14:00'];
var arrayFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var arrayPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// var removedFeatures = [];
// removedFeatures = arrayFeatures.slice(
// getRandom(0, arrayFeatures.length - 1),
// getRandom(1, arrayFeatures.length - 1)
// );

// console.log('removedFeatures ' + removedFeatures);

var makeAdvert = function() {
  return {
    author: { avatar: 'img/avatars/user0' + getRandom(1, 8) + '.png' },
    location: {
      х: getRandom(0, 983),
      y: getRandom(130, 360)
    },
    offer: {
      title: arrayTitles[getRandom(0, arrayTitles.length - 1)],
      address: function() {
        location.x, location.y;
      },
      price: getRandom(1000, 1000000),
      type: arrayTypes[getRandom(0, arrayTypes.length - 1)],
      rooms: getRandom(1, 5),
      guests: getRandom(1, 20),
      checkin: arrayCheckins[getRandom(0, arrayCheckins.length - 1)],
      checkout: arrayCheckouts[getRandom(0, arrayCheckouts.length - 1)],
      description: ' ',
      features: function() {
        arrayFeatures.slice(
          getRandom(0, arrayFeatures.length - 1),
          getRandom(1, arrayFeatures.length - 1)
        );
      },
      photos: arrayPhotos[i]
    }
  };
};

var adverts = [];
for (var i = 0; i < 8; i++) {
  adverts.push(makeAdvert());
}
// иммитация активного  режима
var aktivMap = document.querySelector('.map');
aktivMap.classList.remove('.map--faded');

var similarListElement = document.querySelector('.map__pins');
var mapCardTemplate = document.querySelector('#card');

console.log(adverts);

// создание своего  элемента на основе шаблона .map__card
var renderAdvert = function(advert) {
  var adElement = mapCardTemplate.cloneNode(true);
  for (var j = 0; j < advert.length; j++) {
    adElement.querySelector('.popup__title').textContent =
      advert[j].offer.title;
    adElement.querySelector('.popup__text--price').textContentl =
      advert[j].offer.price;
    adElement.querySelector('.popup__type').textContent = advert[j].offer.type;
  }
  return adElement;
};

// отрисовка нового элемента
var fragment = document.createDocumentFragment();
for (var k = 0; k < adverts.length; k++) {
  fragment.appendChild(renderAdvert(adverts[k]));
}

similarListElement.appendChild(fragment);

//console.log(renderAdvert(Adverts[1]));
