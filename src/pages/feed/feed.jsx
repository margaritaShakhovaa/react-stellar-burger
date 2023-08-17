import styles from './feed.module.css';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {wsOrderConnect, wsOrderDisconnect} from "../../services/actions/order-feed";
import OrderCard from "../../components/order-card/order-card";
import { wsFeedUrl } from "../../utils/constants";

const FeedPage = () => {

  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(state => state.feedOrders.orders);

  useEffect(() => {
    dispatch(wsOrderConnect(wsFeedUrl))
    return () => {
      dispatch(wsOrderDisconnect())
    }
  },[]);

  const doneList = orders && orders.map(item => {
    if (item.status === 'done') return item.number;
  }).slice(0, 9);

  const pendingList = orders && orders.map(item => {
    if (item.status === 'pending') return item.number;
  }).slice(0, 9);

  return (
      <main className={styles.feed}>
        <h1 className='mb-1 mt-10 text text_type_main-large'>Лента заказов</h1>
        <div className={styles.container}>
          <ul className={`${styles.list} custom-scroll`}>
            {
                orders && orders.map(
                    (item) => <OrderCard key={item._id} order={item} />
                )
            }
          </ul>
          <div className={styles.orders_box}>
            <div className={styles.orders}>
              <div className={styles.info}>
                <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
                {orders && doneList && doneList.map((item, index) => <p key={index} className={`text text_type_digits-default ${styles.number}`}>{item}</p>)}
              </div>
              <div className={styles.info}>
                <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                {orders && pendingList && pendingList.map((item, index) => <p key={index} className="text text_type_digits-default">{item}</p>)}
              </div>
            </div>

            <div className="mt-15">
              <p className="text text_type_main-medium">Выполнено за все время:</p>
              <p className={`text text_type_digits-large ${styles.digits}`}>{total}</p>
            </div>
            <div className="mt-15">
              <p className="text text_type_main-medium">Выполнено за сегодня:</p>
              <p className={`text text_type_digits-large ${styles.digits}`}>{totalToday}</p>
            </div>
          </div>
        </div>
        
      </main>
  )
};

export default FeedPage;