export const apiBurger = 'https://norma.nomoreparties.space/api';
export const wsFeedUrl = 'wss://norma.nomoreparties.space/orders/all';
const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken').slice(7) : '';
export const wsUserOrdersUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

export const getTimeZone = (createdAt) => {
  if (new Date(createdAt).getTimezoneOffset() < 0) {
    return "i-GMT+" + (new Date(createdAt).getTimezoneOffset() / -60);
  } else {
    return "i-GMT-" + (new Date(createdAt).getTimezoneOffset() / -60);
  }
};

export const getStatus = (status) => {
  if (status === 'done') {
    return 'Выполнен';
  } else if (status === 'created') {
    return 'Создан';
  } else {
    return 'Готовится';
  }
};

// создаем функцию проверки ответа на `ok`
export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = (endpoint, options) => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${apiBurger}${endpoint}`, options)
      .then(checkResponse)
      .then(checkSuccess);
};