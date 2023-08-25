import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './order-info.module.css';
import { getOrder } from "../../services/actions/order";
import PropTypes from "prop-types";
import { getStatus, getTimeZone } from "../../utils/constants";

const OrderInfoPage = ({ isModal }) => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const counter = {};
  const ingredientsData = [];

  const getIngredientsList = store => store.ingredients.ingredients;
  const ingredientsList = useSelector(getIngredientsList);

  const getOrderId = store => store.order;
  const { orderData } = useSelector(getOrderId);
  const { name, number, ingredients, status, createdAt } = orderData;

  useEffect(() => {
    dispatch(getOrder(id));
  }, [id]);

  const totalPrice = ingredients && ingredientsList && ingredients.reduce((total, id) => {
    ingredientsList.forEach(item => {
      if (item._id=== id) {
        total += item.price
      }
    })
    return total;
  }, 0);

  if (ingredients && ingredientsList) {
    ingredients.forEach((item) => {
      if (counter[item] === undefined) {
        counter[item] = 1;
        ingredientsData.push(ingredientsList.find(element => element._id === item));
      } else {
        counter[item] ++;
      }
    })
  }

  return (
      <div className={ !!isModal
        ? styles.container_modal
        : styles.container_window
      }>
        <p className='text text_type_digits-default'>{`#${number}`}</p>
        <h1 className='text text_type_main-medium mt-10'>{name}</h1>
        <p className={status === 'done'
            ? `${styles.status} text text_type_main-default mt-3`
            : `text text_type_main-default mt-3`
        }>
          {getStatus(status)}
        </p>
        <h2 className={`text text_type_main-medium mt-15 ${styles.info}`}>Состав:</h2>

        <ul className={`${styles.ingredients} mt-6 custom-scroll`}>
          {
              ingredients && ingredientsList && ingredientsData &&
              ingredientsData.map((item) =>
                  <li key={item._id} className={styles.item}>
                    <div className={styles.box}>
                      <div className={styles.image_background}>
                        <div className={styles.image_container}>
                          <img
                              className={styles.image}
                              src={item.image}
                              alt={item.name}
                          />
                        </div>

                      </div>
                      <p className={`${styles.name} pl-4 text text_type_main-default`}>{item.name}</p>
                    </div>

                    <div className={`${styles.price} mr-6`}>
                      <span className='text text_type_digits-default'>{counter[item._id]}</span>
                      <span className='text text_type_main-default'>&nbsp;x&nbsp;</span>
                      <span className='text text_type_digits-default mr-2'>{item.price}</span>
                      <CurrencyIcon type="primary" />
                    </div>

                  </li>
              )
          }
        </ul>

        <div className={`${styles.order_date_price} mt-10`}>
          <div className={styles.order_date}>
            <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(createdAt)} />
            <p className="text text_type_main-default text_color_inactive">{getTimeZone(createdAt)}</p>
          </div>
          <div className={`${styles.order_price} ml-2`}>
            <p className='text text_type_digits-default mr-2'>{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>

      </div>
  );
};

export default OrderInfoPage;

OrderInfoPage.propTypes = {
  isModal: PropTypes.bool
};