"use strict";

// получаю объявления пользователей
// и mapPinы на основе этих объявлений

(function() {

  function getLocation(indent) {
    const location = {};
    const coord = new GetCoord(window.dom.mapPins, indent);
    location.x = coord.getCoordX();
    location.y = coord.getCoordY();
    return location;
  }

  function createUsersNotices(elementsQuantity) {
    const usersNotices = [];
    for (let i = 0; i < elementsQuantity; i++) {
      const location = getLocation(window.data.indent);
      usersNotices[i] = new UserNotice(i, location);
    }
    return usersNotices;
  }

  // Создаю массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку
  // перед тем как создать массив объектов, перемешаю массив заголовков
  // window.util.shuffle(window.data.titlesArr);
  // window.data.usersNotices = createUsersNotices(8);

  // напишу функцию для создания каждого элемента userNotice
  function getMapPin(i, arr) {
    const mapPin = window.createFragment.template.querySelector(".map__pin").cloneNode(true);
    mapPin.querySelector("img").src = arr[i].author.avatar;
    mapPin.querySelector("img").alt = arr[i].offer.title;
    mapPin.style = getStrokeCoordsCenter(i, arr);
    return mapPin;
  }

  // функции для получения координат центра метки:
  function getMapPinCoordCenterX(index, arr) {
    return arr[index].location.x - (1 / 2 * window.data.mapPinWidth);
  }

  function getMapPinCoordCenterY(index, arr) {
    return arr[index].location.y - window.data.mapPinHeight;
  }

  // функция для получения строки с координатами
  function getStrokeCoordsCenter(index, arr) {
    const x = getMapPinCoordCenterX(index, arr);
    const y = getMapPinCoordCenterY(index, arr);
    return "left:" + x + "px;" + " top:" + y + "px;";
  }

  // функция для получения объявлений пользователей
  // function getMapPins(arr, whereInsert) {
  //   for (let i = 0; i < arr.length; i++) {
  //     whereInsert.append(getMapPin(i));
  //   }
  // }
  // функция для получения объявлений пользователей
  // + дополнительный параметр - количество объявлений
  function getMapPins(arr, whereInsert, numberOfNotices) {
    for (let i = 0; i < numberOfNotices; i++) {
      whereInsert.append(getMapPin(i, arr));
    }
  }


  // получу elem1 фрагмента из массива usersNotices
  getMapPins(window.data.mock, window.createFragment.elem1, 5);

  window.usersNotice = {
    "getMapPins": getMapPins,
    "createUsersNotices": createUsersNotices,
  };
})();
