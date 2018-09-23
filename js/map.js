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

var nameOfType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var randomAvatars = [];
var adverts = [];
var activeMapElement = document.querySelector('.map');
var similarListElement = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin');
var pinsWidth = document.querySelector('.map__pins').offsetWidth;

var getRandom = function (min, max) {
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
var makeRandomAvavtar = function () {
  for (var i = 1; i < 9; i++) {
    var elemCopyAvatar = 'img/avatars/user0' + i + '.png';
    randomAvatars.push(elemCopyAvatar);
  }
};

// массив случайной длины для Features
var makeFeatures = function () {
  var copyFeatures = [];
  // создаем копию
  copyFeatures = arrayFeatures.slice(0, arrayFeatures.length);
  return copyFeatures.splice(0, getRandom(1, copyFeatures.length));
};

// формируем объект для объявления
var makeAdvert = function () {
  var locationX = getRandom(0, pinsWidth);
  var locationY = getRandom(130, 360);
  return {
    author: {
      avatar: randomAvatars.splice(getRandom(0, randomAvatars.length - 1), 1)
    },
    location: {
      x: locationX,
      y: locationY
    },
    offer: {
      title: arrayTitles.splice(getRandom(0, arrayTitles.length - 1), 1),
      address: locationX + ', ' + locationY,
      price: getRandom(1000, 1000000),
      type: arrayTypes[getRandom(0, arrayTypes.length - 1)],
      rooms: getRandom(1, 5),
      guests: getRandom(1, 20),
      checkin: arrayCheckins[getRandom(0, arrayCheckins.length - 1)],
      checkout: arrayCheckouts[getRandom(0, arrayCheckouts.length - 1)],
      description:
        'Прекрасное местечко в центре Токио. Подходит как туристам, так и бизнесменам.',
      features: makeFeatures(),
      photos: shuffle(arrayPhotos)
    }
  };
};

// формируем массивы объектов

var generateMockData = function () {
  makeRandomAvavtar();
  for (var i = 0; i < 8; i++) {
    adverts.push(makeAdvert());
  }
};

// создание своего  элемента на основе шаблона #card
var renderAdvert = function (advert) {
  // сохранение шаблона всей карточки
  var adElement = document.querySelector('#card').cloneNode(true).content;
  // сохранение всех элементов Features
  var popupFeatures = adElement.querySelector('.popup__features');
  var elementFeature = popupFeatures.cloneNode(true);
  var data = advert.offer;
  adElement.querySelector('.popup__title').textContent = data.title;
  adElement.querySelector('.popup__text--price').textContent =
    data.price + ' ₽/ночь';
  adElement.querySelector('.popup__type').textContent = nameOfType[data.type];
  adElement.querySelector('.popup__text--capacity').textContent =
    data.rooms + ' комнаты для ' + data.guests + ' гостей';
  adElement.querySelector('.popup__text--time').textContent =
    'Заезд после ' + data.checkin + ', выезд до ' + data.checkout;
  popupFeatures.innerHTML = '';
  data.features.forEach(function (element) {
    var blockFeatures = elementFeature
      .querySelector('.popup__feature--' + element)
      .cloneNode(true);
    popupFeatures.appendChild(blockFeatures);
  });
  adElement.querySelector('.popup__description').textContent = data.description;
  data.photos.forEach(function (element) {
    var photoBlockTemplate = adElement
      .querySelector('.popup__photos img')
      .cloneNode(true);
    photoBlockTemplate.src = element;
    adElement.querySelector('.popup__photos').appendChild(photoBlockTemplate);
  });
  adElement.querySelector('.popup__photos img:nth-child(1)').remove();
  adElement.querySelector('.popup__avatar').src = advert.author.avatar;
  return adElement;
};

// формируем метку
var renderPins = function (item) {
  var pin = mapPinTemplate.cloneNode(true).content;
  pin.querySelector('.map__pin').style.left = item.location.x + 'px';
  pin.querySelector('.map__pin').style.top = item.location.y + 'px';
  pin.querySelector('img').src = item.author.avatar;
  pin.querySelector('img').alt = item.offer.title;
  return pin;
};
// отрисовка 8 меток

var render = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderPins(adverts[i]));
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
};

activeMapElement.classList.remove('map--faded');

generateMockData();

render();
