import { TFeedMiddleware, TProfileOrdersMiddleware } from "./middleware-types";
import { TProfileOrdersActions } from "../actions/profile-orders";
import {TOrderFeedActions} from "../actions/order-feed";

export const socketMiddleware = (wsActions: TFeedMiddleware | TProfileOrdersMiddleware) => {
  return (store: { dispatch: (type: TProfileOrdersActions | TOrderFeedActions) => void; }) => {
    let socket: WebSocket | null = null;

    return (next: (arg0: TProfileOrdersActions | TOrderFeedActions) => void) => (action: TProfileOrdersActions | TOrderFeedActions) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      if (type === wsConnect) {
        socket = new WebSocket(action.payload);
        dispatch({ type: wsConnecting });
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onclose = () => {
          dispatch({ type: onClose });
        };

        socket.onerror = () => {
          dispatch({
            type: onError,
            payload: "Error"
          });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({
            type: onMessage,
            payload: parsedData
          });
        };

        if (type === wsDisconnect) {
          socket.close();
          socket = null;
        }
      }
      next(action);
    };
  };
};