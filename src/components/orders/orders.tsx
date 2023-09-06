import styles from './orders.module.css';
import { FC, useEffect } from "react";
import { wsProfileOrdersConnect, wsProfileOrdersDisconnect } from "../../services/actions/profile-orders";
import { wsOrderConnect, wsOrderDisconnect } from "../../services/actions/order-feed";
import OrderCard from "../order-card/order-card";
import { wsFeedUrl, wsUserOrdersUrl } from "../../utils/constants";
import { useDispatch, useSelector } from '../../services/types/hooks';

const Orders: FC = () => {

  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.feedOrders.orders);

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