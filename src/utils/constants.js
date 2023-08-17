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