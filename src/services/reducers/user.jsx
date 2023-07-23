import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from "../actions/user";

const initialState = {
  user: {
    email: '',
    name: ''
  },

  getUserRequest: false,
  getUserFailed: false,

  loginRequest: false,
  loginFailed: false,

  logoutRequest: false,
  logoutFailed: false,

  registerRequest: false,
  registerFailed: false,

  updateUserRequest: false,
  updateUserFailed: false,

  forgotPasswordRequest: false,
  forgotPasswordFailed: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: false,
        name: action.payload.user.name,
        email: action.payload.user.email
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        name: null,
        email: null,
        getUserRequest: false,
        getUserFailed: true
      };
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
        name: action.payload.user.name,
        email: action.payload.user.email
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        name: null,
        email: null,
        loginRequest: false,
        loginFailed: true
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: false,
        name: null,
        email: null
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: false,
        email: action.payload.user.email,
        name: action.payload.user.name
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
        name: '',
        email: ''
      };
    }
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateUserRequest: true
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: false,
        name: action.payload.user.name,
        email: action.payload.user.email
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: true
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordFailed: false
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordRequest: false,
        forgotPasswordFailed: true
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: false
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true
      };
    }
    default: {
      return state
    }
  }
}