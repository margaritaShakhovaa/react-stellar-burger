import {
    WS_ORDER_CLOSE,
    WS_ORDER_CONNECT,
    WS_ORDER_CONNECTING,
    WS_ORDER_DISCONNECT, WS_ORDER_ERROR, WS_ORDER_MESSAGE,
    WS_ORDER_OPEN
} from "../actions/order-feed";
import {
    WS_PROFILE_ORDERS_CLOSE,
    WS_PROFILE_ORDERS_CONNECT,
    WS_PROFILE_ORDERS_CONNECTING,
    WS_PROFILE_ORDERS_DISCONNECT, WS_PROFILE_ORDERS_ERROR, WS_PROFILE_ORDERS_MESSAGE, WS_PROFILE_ORDERS_OPEN
} from "../actions/profile-orders";

export type TFeedMiddleware = {
    wsConnect: typeof WS_ORDER_CONNECT;
    wsDisconnect: typeof WS_ORDER_DISCONNECT;
    wsConnecting: typeof WS_ORDER_CONNECTING;
    onOpen: typeof WS_ORDER_OPEN;
    onClose: typeof WS_ORDER_CLOSE;
    onMessage: typeof WS_ORDER_MESSAGE;
    onError: typeof WS_ORDER_ERROR;
};

export type TProfileOrdersMiddleware = {
    wsConnect: typeof WS_PROFILE_ORDERS_CONNECT;
    wsDisconnect: typeof WS_PROFILE_ORDERS_DISCONNECT;
    wsConnecting: typeof WS_PROFILE_ORDERS_CONNECTING;
    onOpen: typeof WS_PROFILE_ORDERS_OPEN;
    onClose: typeof WS_PROFILE_ORDERS_CLOSE;
    onError: typeof WS_PROFILE_ORDERS_ERROR;
    onMessage: typeof WS_PROFILE_ORDERS_MESSAGE;
};