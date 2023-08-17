import styles from './orders.module.css';
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { wsProfileOrdersConnect, wsProfileOrdersDisconnect } from "../../services/actions/profile-orders";
import { wsOrderConnect, wsOrderDisconnect } from "../../services/actions/order-feed";
import OrderCard from "../order-card/order-card";
import { wsFeedUrl, wsUserOrdersUrl } from "../../utils/constants";

const Orders = () => {

  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.feedOrders.orders);

  useEffect(() => {
    dispatch(wsProfileOrdersConnect(wsUserOrdersUrl));
    dispatch(wsOrderConnect(wsFeedUrl))
    return () => {
      dispatch(wsProfileOrdersDisconnect());
      dispatch(wsOrderDisconnect())
    }
  }, [])

  return (
      <ul className={`${styles.container} custom-scroll`}>
        { orders && orders.map((item) => <OrderCard key={item._id} order={item} />) }
      </ul>
  )
};

export default Orders;