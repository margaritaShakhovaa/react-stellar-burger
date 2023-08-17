import {
  CREATE_ORDER_NUMBER_FAILED,
  CREATE_ORDER_NUMBER_REQUEST,
  CREATE_ORDER_NUMBER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST
} from "../actions/order";

const initialState = {
  order: null,
  orderData: {},

  createOrderNumberRequest: false,
  createOrderNumberFailed: false,

  getOrderRequest: false,
  getOrderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
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
        order: action.order
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
    default:
      return state;
  }
};