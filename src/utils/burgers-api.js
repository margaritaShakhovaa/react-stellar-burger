import { apiBurger, checkResponse, request } from "./constants";

export const getIngredientsRequest = () => request('/ingredients');

export const loginRequest = (data) => request('/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: data.email,
    password: data.password
  })
});

export const logoutRequest = (data) => request('/auth/logout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    token: data
  })
});

export const registerRequest = (data) => request('/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: data.email,
    password: data.password,
    name: data.name
  })
});

export const forgotPasswordRequest = (data) => request('/password-reset', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: data.email
  })
});

export const resetPasswordRequest = (data) => request('/password-reset/reset', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    password: data.password,
    token: data.token
  })
});

export const refreshToken = () => request('/auth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify({
    token: localStorage.getItem('refreshToken')
  }),
});

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

export const getOrderRequest = (order) => request(`/orders/${order}`);