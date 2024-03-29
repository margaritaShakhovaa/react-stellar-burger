import styles from './order-details.module.css';
import React, { FC } from "react";
import done from '../../images/done.svg'
import { useSelector } from '../../services/types/hooks';

const OrderDetails: FC = () => {

  const orderNumber = useSelector((store) => store.order.order);

  return (
      <div className={styles.container}>
        <p className='text text_type_digits-large'>{orderNumber}</p>
        <p className={'text text_type_main-medium mt-8'}>идентификатор заказа</p>
        <img className={styles.image} src={done} alt="Готово"/>
        <p className='text text_type_main-small mt-15'>Ваш заказ начали готовить</p>
        <p  className='text text_type_main-small text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</p>
      </div>
  )
};

export default OrderDetails;