
import {
  WS_PROFILE_ORDERS_CLOSE,
  WS_PROFILE_ORDERS_ERROR,
  WS_PROFILE_ORDERS_MESSAGE,
  WS_PROFILE_ORDERS_OPEN
} from "../actions/profile-orders";

const initialState = {
  status: false,
  ordersData: null,
  connectingError: ''
}

export const profileOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_PROFILE_ORDERS_OPEN:
      return {
        ...state,
        status: true,
        connectingError: ''
      };
    case WS_PROFILE_ORDERS_CLOSE:
      return {
        ...state,
        status: false,
      };
    case WS_PROFILE_ORDERS_ERROR:
      return {
        ...state,
        connectingError: action.payload,
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