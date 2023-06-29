import React, { useEffect } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { getOrder } from "../../services/actions/order";
import { useDrop } from "react-dnd";
import { addIngredient } from "../../services/actions/burger-constructor";
import MainIngredient from "../main-ingredient/main-ingredient";
import { v4 as uuidv4 } from "uuid";

const BurgerConstructor = () => {

  // Чтение ингредиентов из стора
  const ingredients = useSelector(store => store.ingredients.ingredients);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  // булочки
  const buns = useSelector(store => store.burgerConstructor.buns);
  // остальные ингредиенты
  const fillings = useSelector(store => store.burgerConstructor.fillings);

  // Логика открытия/закрытия модального окна с деталями заказа
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const createOrder = () => {
    const ingredientsId = ingredients.map(item => item._id);
    dispatch(getOrder(ingredientsId));
    setModalIsOpen(true);
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
          <Button htmlType="button" type="primary" size="large" onClick={createOrder}>
            Оформить заказ
          </Button>
        </div>
        <Modal handleClose={() => setModalIsOpen(false)} isOpen={modalIsOpen} header={""}>
          <OrderDetails />
        </Modal>
      </section>

  )
}

export default BurgerConstructor;