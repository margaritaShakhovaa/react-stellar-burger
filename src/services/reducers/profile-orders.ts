import {
  TProfileOrdersActions,
  WS_PROFILE_ORDERS_CLOSE,
  WS_PROFILE_ORDERS_ERROR,
  WS_PROFILE_ORDERS_MESSAGE,
  WS_PROFILE_ORDERS_OPEN
} from "../actions/profile-orders";
import {TOrders} from "../types/data";

export type TProfileOrdersInitialState = {
  status: boolean;
  ordersData: TOrders;
  wsConnected: string;
};

const initialState: TProfileOrdersInitialState = {
  status: false,
  ordersData: {
    success: true,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  wsConnected: ''
};

export const profileOrdersReducer = (state: TProfileOrdersInitialState = initialState, action: TProfileOrdersActions) => {
  switch (action.type) {
    case WS_PROFILE_ORDERS_OPEN:
      return {
        ...state,
        status: true,
        wsConnected: ''
      };
    case WS_PROFILE_ORDERS_CLOSE:
      return {
        ...state,
        status: false,
      };
    case WS_PROFILE_ORDERS_ERROR:
      return {
        ...state,
        wsConnected: '',
      };
    case WS_PROFILE_ORDERS_MESSAGE:
      return {
        ...state,
        ordersData: action.payload
      }
    default:
      return state;
  }
};