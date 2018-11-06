'use strict';

(function () {
  var STATE_SUCCESS = 200;
  var ESC_KEYCODE = 27;
  var Address = {
    SEND_FORM: 'https://js.dump.academy/keksobooking',
    GET_DATA: 'https://js.dump.academy/keksobooking/data'
  };
  var errorMessage = document.querySelector('.error__message');
  var errorContent = document.querySelector('#error').content;
  var mainElement = document.querySelector('main');
  var onError = function () {
    var errorTemplate = errorContent.cloneNode(true);
    var errorElement = errorTemplate.querySelector('.error');
    mainElement.appendChild(errorTemplate);

    var onEscError = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        errorElement.remove();
        document.removeEventListener('keydown', onEscError);
      }
    };
    document.addEventListener('keydown', onEscError);

    errorElement.addEventListener('click', function () {
      errorElement.remove();
    });
    var errorButton = document.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      errorElement.remove();
    });
  };
  var ajax = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATE_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError(errorMessage);
    });
    return xhr;
  };

  var load = function (onLoad) {
    var request = ajax(onLoad);
    request.open('GET', Address.GET_DATA);
    request.send();
  };
  var upload = function (data, onLoad) {
    var request = ajax(onLoad);
    request.open('POST', Address.SEND_FORM);
    request.send(data);
  };

  window.backend = {
    upload: upload,
    load: load
  };
})();
