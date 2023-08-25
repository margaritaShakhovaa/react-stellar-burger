import React from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { createOrderNumber, DELETE_ORDER_NUMBER } from "../../services/actions/order";
import { useDrop } from "react-dnd";
import { addIngredient } from "../../services/actions/burger-constructor";
import MainIngredient from "../main-ingredient/main-ingredient";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/loader";

const BurgerConstructor = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // булочки
  const getBuns = (store) => store.burgerConstructor.buns;
  const buns = useSelector(getBuns);

  // остальные ингредиенты
  const getFillings = (store) => store.burgerConstructor.fillings;
  const fillings = useSelector(getFillings);

  // Логика открытия/закрытия модального окна с деталями заказа
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const getUserData = (store) => store.user.user;
  const user = useSelector(getUserData);

  const getOrderSuccess = (store) => store.order.createOrderNumberSuccess;
  const orderSuccess = useSelector(getOrderSuccess);

  const openModal = () => {
    createOrder();
    setModalIsOpen(true);
  };

  const createOrder = () => {
    const ingredientsId = fillings.map(item => item._id);
    if (!user) {
      navigate("/login");
      return;
    }
    if (buns) {
      ingredientsId.push(buns._id);
      ingredientsId.push(buns._id);
    }
    if (ingredientsId.length > 0) {
      // Отправка запроса
      dispatch(createOrderNumber(ingredientsId))
    }
  };

  const closeModal =() => {
    setModalIsOpen(false);
    dispatch({ type: DELETE_ORDER_NUMBER })
  };

  const [, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
      if (buns && buns._id === item._id) return;
      const ingredient = Object.assign({}, item);
      ingredient.uuid = uuidv4();
      dispatch(addIngredient(ingredient));
  }});

  const totalPrice = React.useMemo(() => fillings.reduce(
          (total, item) => (total += item.price),
          buns ? buns.price * 2 : 0),
      [buns, fillings]);

  return (
      <section className={styles.constructor_box} ref={dropRef}>
        <div className={`mt-15 ${styles.constructor_container}`}>
          <div className={styles.info}>
            {buns ? (
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${buns.name} (верх)`}
                    price={buns.price}
                    thumbnail={buns.image}
                    extraClass={`ml-4 mb-4`}
                />
            ) : null
            }
          </div>

          <ul className={`custom-scroll ${styles.constructor_list}`}>
            {fillings.map((item, index) => {
              return (
                <MainIngredient
                    key={item.uuid}
                    index={index}
                    item={item}
                />
              );
            })}
          </ul>

          <div className={styles.info}>
            {buns ? (
                < ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${buns.name} (низ)`}
                    price={buns.price}
                    thumbnail={buns.image}
                    extraClass={`ml-4 mt-4`}
              />
              ) : null
            }
          </div>
        </div>
        <div className={`mt-10 mr-4 ${styles.total}`}>
          <div className={styles.price}>
            <p className="text text_type_digits-medium">{totalPrice ? totalPrice : 0}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={ buns
              ? openModal
              : null
              }
          >
            Оформить заказ
          </Button>
        </div>
        { modalIsOpen &&
            <Modal handleClose={closeModal} header={""}>
              { orderSuccess
                  ? <OrderDetails/>
                  : <Loader/>
              }
            </Modal>
        }
      </section>

  )
};

export default BurgerConstructor;