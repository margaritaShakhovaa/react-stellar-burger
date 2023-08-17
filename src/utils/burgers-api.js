import { apiBurger } from "./constants";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredientsRequest = () => {
  return fetch(`${apiBurger}/ingredients`).then(checkResponse)
};

export const loginRequest = (data) => {
  return fetch(`${apiBurger}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  })
      .then(checkResponse);
};

export const logoutRequest = (data) => {
  return fetch(`${apiBurger}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: data
    })
  })
      .then(checkResponse);
};

export const registerRequest = (data) => {
  return fetch(`${apiBurger}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name
    })
  })
      .then(checkResponse);
};

export const forgotPasswordRequest = (data) => {
  return fetch(`${apiBurger}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email
    })
  })
      .then(checkResponse);
};

export const resetPasswordRequest = (data) => {
  return fetch(`${apiBurger}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: data.password,
      token: data.token
    })
  })
      .then(checkResponse);
};

export const refreshToken = () => {
  return fetch(`${apiBurger}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUserRequest = () => {
  return fetchWithRefresh(`${apiBurger}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('accessToken')
    }
  })
};

export const updateUserProfileRequest = (data) => {
  return fetchWithRefresh(`${apiBurger}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password
    })
  })
};

export const getOrderNumberRequest = (ingredients) => {
  return fetchWithRefresh(`${apiBurger}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      ingredients: ingredients
    }),
  })
};

export const getOrderRequest = (order) => {
  return fetch(`${apiBurger}/orders/${order}`).then(checkResponse)
};