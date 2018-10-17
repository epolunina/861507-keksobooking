'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var URL1 = 'https://js.dump.academy/keksobooking/data';
  var errorElement = document.querySelector('.error__message');
  // функция получения данных с сервера
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(errorElement);
    });
    xhr.open('GET', URL1);
    xhr.send();
  };
  //  функция отправки данных на сервер

  var upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
    xhr.open('POST', URL);
    xhr.send(data);
    xhr.addEventListener('error', function () {
      onError(errorElement);
    });
  };
  window.backend = {
    upload: upload,
    load: load
  };
})();
//

/*
var xhr = new XMLHttpRequest();
xhr.addEventListener('onload', function () {
  try {
    console.log(JSON.parse(xhr.responseText));
  } catch (err) {
    console.error(err.message);
  }
});
*/
