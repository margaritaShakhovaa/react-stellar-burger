export const WS_PROFILE_ORDERS_CONNECT: 'WS_PROFILE_ORDERS_CONNECT' = 'WS_PROFILE_ORDERS_CONNECT';
export const WS_PROFILE_ORDERS_DISCONNECT: 'WS_PROFILE_ORDERS_DISCONNECT' = 'WS_PROFILE_ORDERS_DISCONNECT';
export const WS_PROFILE_ORDERS_CONNECTING: 'WS_PROFILE_ORDERS_CONNECTING' = 'WS_PROFILE_ORDERS_CONNECTING';
export const WS_PROFILE_ORDERS_OPEN: 'WS_PROFILE_ORDERS_OPEN' = 'WS_PROFILE_ORDERS_OPEN';
export const WS_PROFILE_ORDERS_CLOSE: 'WS_PROFILE_ORDERS_CLOSE' = 'WS_PROFILE_ORDERS_CLOSE';
export const WS_PROFILE_ORDERS_MESSAGE: 'WS_PROFILE_ORDERS_MESSAGE' = 'WS_PROFILE_ORDERS_MESSAGE';
export const WS_PROFILE_ORDERS_ERROR: 'WS_PROFILE_ORDERS_ERROR' = 'WS_PROFILE_ORDERS_ERROR';

interface IWsProfileOrdersConnectAction {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECT;
  readonly payload: string;
}

interface IWsProfileOrdersDisconnectAction {
  readonly type: typeof WS_PROFILE_ORDERS_DISCONNECT;
}

interface IWsProfileOrdersConnectingAction {
  readonly type: typeof WS_PROFILE_ORDERS_CONNECTING;
}

interface IWsProfileOrdersOpenAction {
  readonly type: typeof WS_PROFILE_ORDERS_OPEN;
}

interface IWsProfileOrdersCloseAction {
  readonly type: typeof WS_PROFILE_ORDERS_CLOSE;
}

interface IWsProfileOrdersMessageAction {
  readonly type: typeof WS_PROFILE_ORDERS_MESSAGE;
  readonly payload: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  };
}

interface IWsProfileOrdersErrorAction {
  readonly type: typeof WS_PROFILE_ORDERS_ERROR;
}

export type TProfileOrdersActions = IWsProfileOrdersConnectAction
    | IWsProfileOrdersDisconnectAction
    | IWsProfileOrdersConnectingAction
    | IWsProfileOrdersOpenAction
    | IWsProfileOrdersCloseAction
    | IWsProfileOrdersMessageAction
    | IWsProfileOrdersErrorAction;

export const wsProfileOrdersConnect = (url: string): IWsProfileOrdersConnectAction => ({
  type: WS_PROFILE_ORDERS_CONNECT,
  payload: url,
});

export const wsProfileOrdersDisconnect = (): IWsProfileOrdersDisconnectAction => ({
  type: WS_PROFILE_ORDERS_DISCONNECT,
});