import {
  forgotPasswordRequest,
  getUserRequest,
  loginRequest,
  logoutRequest,
  registerRequest,
  resetPasswordRequest,
  updateUserProfileRequest
} from "../../utils/burgers-api";
import {TForm, TUser, TUserUpdate} from "../types/data";
import { AppDispatch, AppThunk } from "../types";

// Запрос информации о пользователе
export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';

interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}

interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

interface IGetUserAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly payload: TUser;
}

export const getUser = (user: TUser): IGetUserAction => ({
    type: GET_USER_SUCCESS,
    payload: user,
});

// Логин
export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';

interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}

interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
}

interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly payload: TUser;
}

// Логаут
export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';

interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}

interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}

interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
}

// Регистрация
export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';

interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}

interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
}

interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    readonly payload: TUser;
}

// Забыть пароль
export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';

interface IForgotPasswordRequestAction {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

// Восстановить пароль
export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';

interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}

// Обновление информации о пользователе
export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';

interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}

interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
}

interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
    readonly payload: TUserUpdate;
}

export type TUserActions = IGetUserRequestAction
    | IGetUserFailedAction
    | IGetUserAction
    | ILoginRequestAction
    | ILoginFailedAction
    | ILoginSuccessAction
    | ILogoutRequestAction
    | ILogoutFailedAction
    | ILogoutSuccessAction
    | IRegisterRequestAction
    | IRegisterFailedAction
    | IRegisterSuccessAction
    | IForgotPasswordRequestAction
    | IForgotPasswordFailedAction
    | IForgotPasswordSuccessAction
    | IResetPasswordRequestAction
    | IResetPasswordFailedAction
    | IResetPasswordSuccessAction
    | IUpdateUserRequestAction
    | IUpdateUserFailedAction
    | IUpdateUserSuccessAction;

export const checkUserAuth: AppThunk = () => {
    return function(dispatch: AppDispatch) {
        dispatch({ type: GET_USER_REQUEST });
        getUserRequest().then(res => {
            dispatch(getUser(res));
        }).catch(() => {
            dispatch({
                type: GET_USER_FAILED
            });
        });
    };
};

export const logIn: AppThunk = (data: TForm) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: LOGIN_REQUEST });
    loginRequest(data)
        .then(res => {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            dispatch(getUser(res));
        })
        .catch(() => {
          dispatch({ type: LOGIN_FAILED });
        });
  };
};

export const logOut: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    logoutRequest()
        .then(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch({ type: LOGOUT_SUCCESS });
        })
        .catch(() => {
          dispatch({ type: LOGOUT_FAILED });
        });
  };
}

export const registerUser: AppThunk = (data: TForm) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: REGISTER_REQUEST });
    registerRequest(data)
        .then(res => {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            dispatch({
              type: REGISTER_SUCCESS,
              payload: res
            });
        })
        .catch(() => {
          dispatch({ type: REGISTER_FAILED });
        });
  };
}

export const updateUser: AppThunk = (data: TForm) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: UPDATE_USER_REQUEST });
    updateUserProfileRequest(data)
        .then(res => {
            dispatch({
              type: UPDATE_USER_SUCCESS,
              payload: res
            });
        })
        .catch(() => {
          dispatch({ type: UPDATE_USER_FAILED });
        });
  };
}

export const forgotPassword: AppThunk = (email: TForm) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    forgotPasswordRequest(email)
        .then(() => {
            dispatch({ type: FORGOT_PASSWORD_SUCCESS });
        })
        .catch(() => {
          dispatch({ type: FORGOT_PASSWORD_FAILED });
        });
  };
}

export const resetPassword: AppThunk = (password: TForm) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    resetPasswordRequest(password)
        .then(() => {
            dispatch({ type: RESET_PASSWORD_SUCCESS });
        })
        .catch(() => {
          dispatch({ type: RESET_PASSWORD_FAILED });
        });
  };
}