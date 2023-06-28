import React, {useEffect} from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { getOrder } from "../../services/actions/order";

const priceInitialState = { totalPrice: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { totalPrice: state.totalPrice + action.payload };
    case "reset":
      return priceInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const BurgerConstructor = () => {

  // Чтение ингредиентов из стора
  const ingredients = useSelector((store) => store.ingredients.ingredients);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  // булочки
  const bun = React.useMemo(() => ingredients.find(item => item.type === 'bun'), [ingredients]);
  // остальные ингредиенты
  const fillings = React.useMemo(() => ingredients.filter(item => item.type !== 'bun'), [ingredients]);

  // Логика открытия/закрытия модального окна с деталями заказа
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const createOrder = () => {
    const ingredientsId = ingredients.map(item => item._id);
    dispatch(getOrder(ingredientsId));
    setModalIsOpen(true);
  };

  const [totalPriceState, dispatchTotalPrice] = React.useReducer(reducer, priceInitialState, undefined);

  useEffect(() => {
    if (ingredients) {
      const totalPrice = bun ? (bun.price * 2 + fillings.reduce((total, item) => total + item.price, 0)) : fillings.reduce((total, item) => total + item.price, 0);
      dispatchTotalPrice({type: 'add', payload: totalPrice});
    }
  }, [ingredients, bun, fillings])

  return (
      <section className={styles.constructor_box}>
          <div className={`mt-15 ${styles.constructor_container}`}>

            {bun &&
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass={`ml-4`}
                />
            }

            <ul className={`custom-scroll ${styles.constructor_list}`}>
              {fillings.map((item) => {
                return (
                    <li className={styles.constructor_card} key={item._id}>
                      <DragIcon type="primary" />
                      <ConstructorElement
                          text={item.name}
                          price={item.price}
                          thumbnail={item.image}
                      />
                    </li>
                )}
              )}
            </ul>

            {bun &&
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass={`ml-4`}
                />
            }

          </div>
        <div className={`mt-10 mr-4 ${styles.total}`}>
          <div className={styles.price}>
            <p className="text text_type_digits-medium">{totalPriceState.totalPrice}</p>
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