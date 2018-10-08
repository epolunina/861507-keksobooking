'use strict';
(function () {
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

  var pinsWidth = document.querySelector('.map__pins').offsetWidth;
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var randomAvatars = [];
  var adverts = [];

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

  var makeRandomAvavtar = function () {
    for (var i = 1; i < 9; i++) {
      var elemCopyAvatar = 'img/avatars/user0' + i + '.png';
      randomAvatars.push(elemCopyAvatar);
    }
  };

  var makeFeatures = function () {
    var copyFeatures = [];
    // создаем копию
    copyFeatures = arrayFeatures.slice(0, arrayFeatures.length);
    return copyFeatures.splice(0, getRandom(1, copyFeatures.length));
  };

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

  var generateMockData = function () {
    makeRandomAvavtar();
    for (var i = 0; i < 8; i++) {
      adverts.push(makeAdvert());
    }
  };

  window.data = {
    generateMockData: generateMockData,
    adverts: adverts
  };
})();
