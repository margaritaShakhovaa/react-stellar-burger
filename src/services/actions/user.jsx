import {
  forgotPasswordRequest,
  getUserRequest,
  loginRequest,
  logoutRequest,
  registerRequest, resetPasswordRequest,
  tokens, updateUserProfileRequest
} from "../../utils/burgers-api";

// Запрос информации о пользователе
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

// Логин
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

// Логаут
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

// Регистрация
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

// Забыть пароль
export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';

// Восстановить пароль
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';

// Обновление информации о пользователе
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

export function logIn(data) {
  return function(dispatch) {
    dispatch({ type: LOGIN_REQUEST });
    loginRequest(data)
        .then(res => {
          if (res.success) {
            localStorage.setItem(tokens.accessToken, res.accessToken);
            localStorage.setItem(tokens.refreshToken, res.refreshToken);
            dispatch({
              type: LOGIN_SUCCESS,
              payload: res
            });
        } else {
            dispatch({ type: LOGIN_FAILED });
          }
        })
        .catch(() => {
          dispatch({ type: LOGIN_FAILED });
        });
  };
}

export function logOut(data) {
  return function(dispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    logoutRequest(data)
        .then(res => {
          if (res.success) {
            localStorage.removeItem(tokens.accessToken);
            localStorage.removeItem(tokens.refreshToken);
            dispatch({ type: LOGOUT_SUCCESS });
          } else {
            dispatch({ type: LOGOUT_FAILED });
          }
        })
        .catch(() => {
          dispatch({ type: LOGOUT_FAILED });
        });
  };
}

export function registerUser(data) {
  return function(dispatch) {
    dispatch({ type: REGISTER_REQUEST });
    registerRequest(data)
        .then(res => {
          if (res.success) {
            localStorage.setItem(tokens.accessToken, res.accessToken);
            localStorage.setItem(tokens.refreshToken, res.refreshToken);
            dispatch({
              type: REGISTER_SUCCESS,
              payload: res
            });
          } else {
            dispatch({ type: REGISTER_FAILED });
          }
        })
        .catch(() => {
          dispatch({ type: REGISTER_FAILED });
        });
  };
}

export function getUser() {
  return function(dispatch) {
    dispatch({ type: GET_USER_REQUEST });
    getUserRequest()
        .then(res => {
          if (res.success) {
            dispatch({
              type: GET_USER_SUCCESS,
              payload: res
            });
          } else {
            dispatch({ type: GET_USER_FAILED });
          }
        })
        .catch(() => {
          dispatch({ type: GET_USER_FAILED });
        });
  };
}

export function updateUser(data) {
  return function(dispatch) {
    dispatch({ type: UPDATE_USER_REQUEST });
    updateUserProfileRequest(data)
        .then(res => {
          if (res.success) {
            dispatch({
              type: UPDATE_USER_SUCCESS,
              payload: res
            });
          } else {
            dispatch({ type: UPDATE_USER_FAILED });
          }
        })
        .catch(() => {
          dispatch({ type: UPDATE_USER_FAILED });
        });
  };
}

export function forgotPassword(data) {
  return function(dispatch) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    forgotPasswordRequest(data)
        .then(res => {
          if (res.success) {
            dispatch({ type: FORGOT_PASSWORD_SUCCESS });
          } else {
            dispatch({ type: FORGOT_PASSWORD_FAILED });
          }
        })
        .catch(() => {
          dispatch({ type: FORGOT_PASSWORD_FAILED });
        });
  };
}

export function resetPassword(data) {
  return function(dispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    resetPasswordRequest(data)
        .then(res => {
          if (res.success) {
            dispatch({ type: RESET_PASSWORD_SUCCESS });
          } else {
            dispatch({ type: RESET_PASSWORD_FAILED });
          }
        })
        .catch(() => {
          dispatch({ type: RESET_PASSWORD_FAILED });
        });
  };
}