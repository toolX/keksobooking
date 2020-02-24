"use strict";
// ---1.создаю массив объявлений пользователей
let map = document.querySelector(".map");
let usersNotices = [];
let autor = {};
// "title": строка, заголовок предложения, одно из фиксированных значений 
//. Значения не должны повторяться.
let titlesArr = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец", 
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде",
];
// "type": строка с одним из четырёх фиксированных значений: 
let typesArr = [
  "palace",
  "flat",
  "house",
  "bungalo",
];
// "checkin": строка с одним из трёх фиксированных значений: 
let checkinsArr = [
  "12:00",
  "13:00",
  "14:00",
];
// "checkout": строка с одним из трёх фиксированных значений: 
let checkoutsArr = [
  "12:00",
  "13:00",
  "14:00",
];
// "photos": массив из строк  расположенных в произвольном порядке
let photosArr = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg", 
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg",
];
// функция, генерирующая случайное число:
function getRandomNumber(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  // для получения случайного числа от min до max округляю rand до меньшего целого
  const random = Math.floor(rand);
  return random;
}

// для случайного выбора элемента из массива использую функцию
function getRandomElement(arr) {
  // мы должны генерировать числа от 0 до arr.lenght - 1
  // случайное число от min до (max+1)
  let min = 0;
  const max = arr.length - 1
  const random = getRandomNumber(min, max);
  return arr[random];
}

// для "перемешивания элементов массива" использую функцию:
function shuffle(arr) {
  let currentIndex = arr.length;
  let temporaryValue; //временное значение
  let randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }
  return arr;
}


// "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, 
// где {{xx}} это число от 1 до 8 с ведущим нулём. 
// Например, 01, 02 и т. д. Адреса изображений не повторяются
// для получения аватар использую следующую функцию. 
// в данном случае получу массив, содержащий нужные мне 8 элементов
function getAvatars(min, max) {
  let arr = [];
  for (let i = min; i <= max; i++) {
    let url = "img/avatars/user0" + i + ".png";
    arr[i - 1] = url;
  }
  return arr;
}

// "location": {
// «x»: случайное число, координата x метки на карте. 
// Значение ограничено размерами блока, в котором перетаскивается метка.
// «y»: случайное число, координата y метки на карте от 130 до 630.
function getLocation() {
  let location = {};
  let y = getRandomNumber(130, 630);
  location.y = y;
  // определим размер родительского блока .map, в котором находится метка
  // let mapWidth = document.querySelector(".map").offsetWidth;
  let mapWidth = map.offsetWidth;
  let x = getRandomNumber(0, mapWidth);
  location.x = x;
  return location;
}

function getCoords() {
  let location = getLocation();
  let coords = location.x + ", " + location.y;
  return coords;
}

// "features": массив строк случайной длины 
// из элементов, перечисленных в массиве featuresArr
// для получения features использую функцию
function getFeatures() {
  // "features": массив строк случайной длины из ниже предложенных: 
  let featuresArr = [
    "wifi",
    "dishwasher",
    "parking",
    "washer",
    "elevator",
    "conditioner",
  ];
  let newArr = [];
  let arrLength = featuresArr.length;
  let elementsQuantity = getRandomNumber(1, arrLength);
  for (let i = 1; i <= elementsQuantity; i++) {
    let element = getRandomElement(featuresArr);
    let index = featuresArr.indexOf(element);
    featuresArr.splice(index, 1);
    newArr[i-1] = element;
  }
  return newArr;
}

// для создания js объектов, описывающих объявления пользователей, 
// использую конструктор объектов
function UserNotice(number) {
  this.autor = getAvatars(1, 8)[number-1];
  this.title = titlesArr[number-1];
  this.address = getCoords();
  this.price = getRandomNumber(1000, 1000000);
  this.type = getRandomElement(typesArr);
  this.rooms = getRandomNumber(1, 5);
  this.guests = getRandomNumber(0, 15); 
  this.checkin = getRandomElement(checkinsArr);
  this.checkout = getRandomElement(checkoutsArr);
  this.features = getFeatures();
  this.description = "";
  this.photos = shuffle(photosArr);
}

// в соответствии с заданием нужно создать 8 таких объектов -
// Создаю массив, состоящий из 8 сгенерированных JS объектов, которые будут описывать похожие объявления неподалёку
function createUsersNotices(elementsQuantity) {
  let usersNotices = [];
  for (let i = 1; i <= elementsQuantity; i++) {
    usersNotices[i-1] = new UserNotice(i);
  }
  return usersNotices;
}
// перед тем как создать массив объектов, перемешаю массив заголовков
shuffle(titlesArr);
usersNotices = createUsersNotices(8);

// ---2. Переключаем карту из неактивного состояния в активное
map.classList.remove("map--faded");

// ---3. Cоздаю DOM-элементы на основе объекта usersNotices и шаблона <template>
// На основе данных, созданных в первом пункте, создайте DOM-элементы, 
// соответствующие меткам на карте, и заполните их данными из массива. 
// Итоговую разметку метки .map__pin можно взять из шаблона .map__card.
// У метки должны быть следующие данные:
// Координаты:style="left: {{location.x}}px; top: {{location.y}}px;"
// src="{{author.avatar}}"
// alt="{{заголовок объявления}}"

// функция для получения координат метки из объекта usersNotice[i]
function getCoordsFromAdress(i) {
  console.log(usersNotices[i].address);
  let index = usersNotices[i].address.indexOf(",");
  console.log(index);
  let x = usersNotices[i].address.slice(0, index);
  console.log(x);
  let y = usersNotices[i].address.slice(index + 2);
  console.log(y);
  let coordsFromAdress = "left:" + x + "px;" + " top:" + y + "px;";
  console.log(coordsFromAdress);
  return coordsFromAdress;
}

// получаю шаблон
let template = document.querySelector("#users-notice").content;
// создам фрагмент, в который буду "складывать" сгенерированные элементы
let fragment = document.createDocumentFragment();
// напишу функцию для создания каждого элемента userNotice
  function getUserNotice(i) {
    let newElem = template.cloneNode(true);
    // newElem.querySelector.querySelector(".map__card").className = "map__pin";
    newElem.querySelector(".popup__avatar").src = usersNotices[i].autor;
    newElem.querySelector(".popup__avatar").alt = usersNotices[i].title;
    newElem.querySelector(".popup").style = getCoordsFromAdress(i);
    return newElem;
  }
// получу фрагмент, перебирая каждый элемент массива usersPhoto
for (let i = 0; i < usersNotices.length; i++) {
fragment.appendChild(getUserNotice(i));
}


// ---3.Вставляю все полученные элементы за один прием в блок ".users-photo"
  let block = document.querySelector(".map__pins");
  block.appendChild(fragment);


