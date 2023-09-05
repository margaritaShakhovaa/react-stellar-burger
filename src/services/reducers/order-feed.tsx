import {
  WS_ORDER_OPEN,
  WS_ORDER_CLOSE,
  WS_ORDER_MESSAGE,
  WS_ORDER_ERROR,
  TOrderFeedActions,
} from '../actions/order-feed';
import { TOrders } from "../types/data";

export type TOrderFeedInitialState = {
  wsConnected: boolean;
  orders: TOrders;
  error: string;
};

const initialState: TOrderFeedInitialState = {
  wsConnected: false,
  orders: {
    success: true,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  error: ''
};

export const feedOrdersReducer = (state: TOrderFeedInitialState = initialState, action: TOrderFeedActions) => {
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
        error: '',
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