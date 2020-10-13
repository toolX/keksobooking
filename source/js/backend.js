"use strict";

// работа с сетью

(function() {

  // загрузка данных с сервера

  const URL_POST = "https//js.dump.academy/keksobooking";
  const URL_GET = "https://js.dump.academy/keksobooking/data";
  const MAX_WAITING_TIME_RESPONSE = 1000;

  let error;

  function upload(data, onSuccess) {
    const xhr = new XMLHttpRequest();
    xhr.response = "json";

    xhr.addEventListener("load", function() {
      onSuccess(xhr.response);
    });

    xhr.open("POST", URL_POST);
    xhr.send(data);
  }

  // получение данных с сервера

  function load(onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.addEventListener("load", function() {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = "неверный запрос";
          break;
        case 404:
          error = "ничего не найдено";
          break;
        default:
          error("Статус ответа: " + xhr.status + " xhr.statusText");
      }
      if (error) {
        onError(error);
      }
    });

    // load произойдет даже если в ответ придет ошибка
    xhr.addEventListener("error", function() {
      error = "Произошла ошибка соединения";
      onError(error);
    });

    // перестрахуемся от слишком долгого ответа
    xhr.addEventListener("timeout", function() {
      error = "Запрос не успел выполниться за " + xhr.timeout + "мс";
      onError(error);
    });

    xhr.open("GET", URL_GET);
    xhr.send();

    xhr.timeout = MAX_WAITING_TIME_RESPONSE;
  }

  window.backend = {
    "upload": upload,
    "load": load,
  };

})();