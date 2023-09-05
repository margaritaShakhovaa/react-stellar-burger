export const apiBurger = 'https://norma.nomoreparties.space/api';
export const wsFeedUrl = 'wss://norma.nomoreparties.space/orders/all';
export const accessToken: string | undefined = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken')?.slice(7) : '';
export const wsUserOrdersUrl: string = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

export const getTimeZone = (createdAt: string) => {
  if (new Date(createdAt).getTimezoneOffset() < 0) {
    return "i-GMT+" + (new Date(createdAt).getTimezoneOffset() / -60);
  } else {
    return "i-GMT-" + (new Date(createdAt).getTimezoneOffset() / -60);
  }
};

export const getStatus = (status: string) => {
  if (status === 'done') {
    return 'Выполнен';
  } else if (status === 'created') {
    return 'Создан';
  } else {
    return 'Готовится';
  }
};

// создаем функцию проверки ответа на `ok`
export const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ошибка ${res.status}`);
};

// создаем функцию проверки на `success`
const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res;
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

type TAuthorization = HeadersInit & {
  authorization?: string | null;
};

export type TOptions = {
  method: string;
  headers: TAuthorization;
  body?: BodyInit | null | undefined;
};

// создаем универсальную фукнцию запроса с проверкой ответа и `success`
// В вызов приходит `endpoint`(часть урла, которая идет после базового) и опции
export const request = (endpoint: string, options?: TOptions) => {
  // а также в ней базовый урл сразу прописывается, чтобы не дублировать в каждом запросе
  return fetch(`${apiBurger}${endpoint}`, options)
      .then(checkResponse)
      .then(checkSuccess);
};