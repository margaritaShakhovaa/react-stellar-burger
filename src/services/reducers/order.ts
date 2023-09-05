import {
  CREATE_ORDER_NUMBER_FAILED,
  CREATE_ORDER_NUMBER_REQUEST,
  CREATE_ORDER_NUMBER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  DELETE_ORDER_NUMBER,
  TOrderActions
} from "../actions/order";
import { TOrder } from "../types/data";

export type TOrderInitialState = {
  order: number | null;
  orderData: TOrder;
  createOrderNumberRequest: boolean;
  createOrderNumberFailed: boolean;
  createOrderNumberSuccess: boolean;
  getOrderRequest: boolean;
  getOrderFailed: boolean;
};

const initialState: TOrderInitialState = {
  order: null,
  orderData: {
    createdAt: '',
    ingredients: [],
    name: '',
    number: 0,
    owner: '',
    status: '',
    updatedAt: '',
    _id: '',
    __v: 0
  },

  createOrderNumberRequest: false,
  createOrderNumberFailed: false,
  createOrderNumberSuccess: false,

  getOrderRequest: false,
  getOrderFailed: false,
};

export const orderReducer = (state: TOrderInitialState = initialState, action: TOrderActions): TOrderInitialState => {
  switch(action.type) {
    case CREATE_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        createOrderNumberRequest: true
      };
    }
    case CREATE_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        createOrderNumberFailed: false,
        createOrderNumberRequest: false,
        createOrderNumberSuccess: true,
        order: action.payload
      };
    }
    case CREATE_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        createOrderNumberFailed: true,
        createOrderNumberRequest: false
      };
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        getOrderRequest: true
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        getOrderFailed: false,
        getOrderRequest: false,
        orderData: action.payload
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        getOrderRequest: false,
        getOrderFailed: true
      };
    }
    case DELETE_ORDER_NUMBER: {
      return {
        ...state,
        order: null
      };
    }
    default:
      return state;
  }
};