import { socketMiddleware } from "./middleware/socket-middleware";

import {
  WS_ORDER_CLOSE,
  WS_ORDER_CONNECT,
  WS_ORDER_ERROR,
  WS_ORDER_OPEN,
  WS_ORDER_MESSAGE,
  WS_ORDER_DISCONNECT,
  WS_ORDER_CONNECTING
} from "./actions/order-feed";
import { composeWithDevTools } from "redux-devtools-extension";
import {applyMiddleware, createStore} from "redux";
import {
  WS_PROFILE_ORDERS_CLOSE,
  WS_PROFILE_ORDERS_CONNECT,
  WS_PROFILE_ORDERS_CONNECTING,
  WS_PROFILE_ORDERS_DISCONNECT,
  WS_PROFILE_ORDERS_ERROR,
  WS_PROFILE_ORDERS_MESSAGE,
  WS_PROFILE_ORDERS_OPEN
} from "./actions/profile-orders";
import thunk from "redux-thunk";
import {rootReducer } from "./reducers";

const feedMiddleware = {
  wsConnect: WS_ORDER_CONNECT,
  wsDisconnect: WS_ORDER_DISCONNECT,
  wsConnecting: WS_ORDER_CONNECTING,
  onOpen:  WS_ORDER_OPEN,
  onClose: WS_ORDER_CLOSE,
  onMessage:  WS_ORDER_MESSAGE,
  onError: WS_ORDER_ERROR
};

const profileOrdersMiddleware ={
  wsConnect: WS_PROFILE_ORDERS_CONNECT,
  wsDisconnect: WS_PROFILE_ORDERS_DISCONNECT,
  wsConnecting: WS_PROFILE_ORDERS_CONNECTING,
  onOpen: WS_PROFILE_ORDERS_OPEN,
  onClose: WS_PROFILE_ORDERS_CLOSE,
  onError: WS_PROFILE_ORDERS_ERROR,
  onMessage: WS_PROFILE_ORDERS_MESSAGE
};

export const wsFeedUrl = 'wss://norma.nomoreparties.space/orders/all';
const accessToken = localStorage.getItem('accessToken') ? localStorage.getItem('accessToken').slice(7) : '';
export const wsUserFeedUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(
        thunk,
        socketMiddleware(feedMiddleware),
        socketMiddleware(profileOrdersMiddleware)
    ))
);