'use strict';

(function () {
  var Address = {
    URL: 'https://js.dump.academy/keksobooking',
    URL1: 'https://js.dump.academy/keksobooking/data'
  };
  var errorElement = document.querySelector('.error__message');

  var ajax = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(errorElement);
    });
    return xhr;
  };

  var load = function (onLoad, onError) {
    var request = ajax(onLoad, onError);
    request.open('GET', Address.URL1);
    request.send();
  };
  var upload = function (data, onLoad, onError) {
    var request = ajax(onLoad, onError);
    request.open('POST', Address.URL);
    request.send(data);
  };

  window.backend = {
    upload: upload,
    load: load
  };
})();
