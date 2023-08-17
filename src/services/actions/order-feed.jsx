export const WS_ORDER_CONNECT = "WS_ORDER_CONNECT";
export const WS_ORDER_DISCONNECT = "WS_ORDER_DISCONNECT";
export const WS_ORDER_CONNECTING = "WS_ORDER_CONNECTING";
export const WS_ORDER_OPEN = "WS_ORDER_OPEN";
export const WS_ORDER_CLOSE = " WS_ORDER_CLOSE";
export const WS_ORDER_MESSAGE = "WS_ORDER_MESSAGE";
export const WS_ORDER_ERROR = "WS_ORDER_ERROR";

export const wsOrderConnect = (url) => ({
  type: WS_ORDER_CONNECT,
  payload: url,
});

export const wsOrderDisconnect = () => ({
  type: WS_ORDER_DISCONNECT,
});