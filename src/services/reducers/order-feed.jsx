import {
  WS_ORDER_OPEN,
  WS_ORDER_CLOSE,
  WS_ORDER_MESSAGE,
  WS_ORDER_ERROR,
} from '../actions/order-feed';

const initialState = {
  wsConnected: false,
  orders: [],
  error: ''
};

export const feedOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_ORDER_OPEN:
      return {
        ...state,
        wsConnected: true,
        error: ''
      };
    case WS_ORDER_CLOSE:
      return {
        ...state,
        wsConnected: false,
        error: ''
      };
    case WS_ORDER_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    case WS_ORDER_MESSAGE:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};