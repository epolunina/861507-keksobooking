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
// сортировка массива в случайном порядке
function shuffle(array) {
  var currentIndex = array.length;
  while (currentIndex !== 0) {
    var randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    var temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
// формируем не повторяющиеся аватарки
var randomAvatars = [];
var makeRandomAvavtar = function() {
  for (var s = 1; s < 9; s++) {
    var elemCopyAvatar = 'img/avatars/user0' + s + '.png';
    randomAvatars.push(elemCopyAvatar);
  }
  shuffle(randomAvatars);
  return randomAvatars;
};
// формируем не повторяющиеся заголовки
var newArrayTitles = [];
var makeRandomTitle = function() {
  newArrayTitles = arrayTitles.slice(0, arrayTitles.length);
  shuffle(newArrayTitles);
  return newArrayTitles;
};

// массив случайной длины для Features
var makeFeatures = function() {
  var copyFeatures = [];
  copyFeatures = arrayFeatures.slice(0, arrayFeatures.length);
  return copyFeatures.splice(0, getRandom(0, copyFeatures.length));
};

var pinsWidth = document.querySelector('.map__pins').offsetWidth;

// формируем объект для объявления
var makeAdvert = function() {
  var locationX = getRandom(0, pinsWidth);
  var locationY = getRandom(130, 360);
  return {
    author: { avatar: randomAvatars[i] },
    location: {
      x: locationX,
      y: locationY
    },
    offer: {
      title: newArrayTitles[i],
      address: locationX + ', ' + locationY,
      price: getRandom(1000, 1000000),
      type: arrayTypes[getRandom(0, arrayTypes.length - 1)],
      rooms: getRandom(1, 5),
      guests: getRandom(1, 20),
      checkin: arrayCheckins[getRandom(0, arrayCheckins.length - 1)],
      checkout: arrayCheckouts[getRandom(0, arrayCheckouts.length - 1)],
      description: ' ',
      features: makeFeatures(),
      photos: arrayPhotos[i]
    }
  };
};

var adverts = [];
for (var i = 0; i < 8; i++) {
  adverts.push(makeAdvert());
}
// иммитация активного  режима
var activeMap = document.querySelector('.map');
activeMap.classList.remove('map--faded');

var similarListElement = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin');

console.log(adverts);
console.log(adverts[0].offer.title);
// создание своего  элемента на основе шаблона #card
var renderAdvert = function(advert) {
  var adElement = document.querySelector('#card').cloneNode(true).content;
  var data = advert.offer;
  console.log(advert.offer.title);
  adElement.querySelector('.popup__title').textContent = data.title;
  adElement.querySelector('.popup__text--price').textContent =
    data.price + '₽/ночь';
  adElement.querySelector('.popup__type').textContent = data.type;
  adElement.querySelector('.popup__text--capacity').textContent =
    data.rooms + 'комнаты для' + data.guests + 'гостей';
  adElement.querySelector('.popup__text--time').textContent =
    'Заезд после' + data.checkin + ', выезд до ' + data.checkout;
  adElement.querySelector('.popup__features').textContent = data.features;
  adElement.querySelector('.popup__description').textContent = data.description;
  adElement.querySelector('.popup__photos img').src = data.photos;
  adElement.querySelector('.popup__avatar').src = advert.author.avatar;
  return adElement;
};

// формируем метку
var renderPins = function(item) {
  var pin = mapPinTemplate.cloneNode(true).content;
  pin.querySelector('.map__pin').style.left = item.location.x + 'px';
  pin.querySelector('.map__pin').style.top = item.location.y + 'px';
  pin.querySelector('img').src = item.author.avatar;
  pin.querySelector('img').alt = item.offer.title;
  return pin;
};

// отрисовка 8 меток
var fragment = document.createDocumentFragment();
for (var k = 0; k < adverts.length; k++) {
  fragment.appendChild(renderPins(adverts[k]));
}
similarListElement.appendChild(fragment);

var card = document.createDocumentFragment();
card.appendChild(renderAdvert(adverts[0]));

// отрисовка карточки
var newElement = document.querySelector('.map');
newElement.insertBefore(
  card,
  document.querySelector('.map__filters-container')
);
