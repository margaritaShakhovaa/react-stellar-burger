import { TOrders } from "../types/data";

export const WS_ORDER_CONNECT: 'WS_ORDER_CONNECT' = 'WS_ORDER_CONNECT';
export const WS_ORDER_DISCONNECT: 'WS_ORDER_DISCONNECT' = 'WS_ORDER_DISCONNECT';
export const WS_ORDER_CONNECTING: 'WS_ORDER_CONNECTING' = 'WS_ORDER_CONNECTING';
export const WS_ORDER_OPEN: 'WS_ORDER_OPEN' = 'WS_ORDER_OPEN';
export const WS_ORDER_CLOSE: 'WS_ORDER_CLOSE' = 'WS_ORDER_CLOSE';
export const WS_ORDER_MESSAGE: 'WS_ORDER_MESSAGE' = 'WS_ORDER_MESSAGE';
export const WS_ORDER_ERROR: 'WS_ORDER_ERROR' = 'WS_ORDER_ERROR';

interface IWsOrderConnectAction {
  readonly type: typeof WS_ORDER_CONNECT;
  readonly payload: string;
}

interface IWsOrderDisconnectAction {
  readonly type: typeof WS_ORDER_DISCONNECT;
}

interface IWsOrderConnectingAction {
  readonly type: typeof WS_ORDER_CONNECTING;
}

interface IWsOrderOpenAction {
  readonly type: typeof WS_ORDER_OPEN;
}

interface IWsOrderCloseAction {
  readonly type: typeof WS_ORDER_CLOSE;
}

interface IWsOrderMessageAction {
  readonly type: typeof WS_ORDER_MESSAGE;
  readonly payload: TOrders;
}

interface IWsOrderErrorAction {
  readonly type: typeof WS_ORDER_ERROR;
}

export type TOrderFeedActions = IWsOrderConnectAction
    | IWsOrderDisconnectAction
    | IWsOrderConnectingAction
    | IWsOrderOpenAction
    | IWsOrderCloseAction
    | IWsOrderMessageAction
    | IWsOrderErrorAction;

export const wsOrderConnect = (url: string): IWsOrderConnectAction => ({
  type: WS_ORDER_CONNECT,
  payload: url,
});

export const wsOrderDisconnect = (): IWsOrderDisconnectAction => ({
  type: WS_ORDER_DISCONNECT,
});