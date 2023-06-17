import React from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { Context } from "../../services/Context";
import { getOrderNumber } from "../../utils/burgers-api";

const BurgerConstructor = () => {

    const ingredients = React.useContext(Context);

    // булочки
    const bread = ingredients.find(item => item.type === 'bun');

    // остальные ингредиенты
    const fillings = ingredients.filter(item => item.type !== 'bun');

    // состояние модального окна
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

    // номер заказа
    const [orderNumber, setOrderNumber] = React.useState(0);

    const createOrder = () => {
      const ingredientsId = ingredients.map(item => item._id);
      getOrderNumber(ingredientsId)
          .then(res => {
              setOrderNumber(res.order.number);
              setModalIsOpen(true);
            })
          .catch(error => console.log(error));
    };

    const totalPrice = fillings.reduce((total, item) => total + item.price, 0) + (bread.price * 2);
    const priceInitialState = { totalPrice: 0 };
    const [priceState, dispatchTotalPrice] = React.useReducer(reducer, priceInitialState, undefined);

    function reducer(state, action) {
      switch (action.type) {
        case "add":
          return { totalPrice: action.payload };
        case "reset":
          return priceInitialState;
        default:
          throw new Error(`Wrong type of action: ${action.type}`);
      }
    }

    React.useEffect(() => {
      if (ingredients) {
        dispatchTotalPrice({type: 'add', payload: totalPrice})
      } else {
        dispatchTotalPrice({type: 'reset'})
      }
    }, [totalPrice, ingredients])

    return (
        <section className={styles.constructor_box}>
            <div className={`mt-15 ${styles.constructor_container}`}>

              {bread &&
                  <ConstructorElement
                      type="top"
                      isLocked={true}
                      text={`${bread.name} (верх)`}
                      price={bread.price}
                      thumbnail={bread.image}
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

              {bread &&
                  <ConstructorElement
                      type="bottom"
                      isLocked={true}
                      text={`${bread.name} (низ)`}
                      price={bread.price}
                      thumbnail={bread.image}
                      extraClass={`ml-4`}
                  />
              }

            </div>
          <div className={`mt-10 mr-4 ${styles.total}`}>
            <div className={styles.price}>
              <p className="text text_type_digits-medium">{priceState.totalPrice}</p>
              <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large" onClick={createOrder}>
              Оформить заказ
            </Button>
          </div>
          <Modal handleClose={() => setModalIsOpen(false)} isOpen={modalIsOpen} header={""}>
            <OrderDetails orderNumber={orderNumber}></OrderDetails>
          </Modal>
        </section>

    )
}

export default BurgerConstructor;