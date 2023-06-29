import React, { useEffect } from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { getOrder } from "../../services/actions/order";
import { useDrop } from "react-dnd";
import { addIngredient, deleteIngredient } from "../../services/actions/burger-constructor";
import MainIngredient from "../main-ingredient/main-ingredient";
import { v4 as uuidv4 } from "uuid";

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
  const ingredients = useSelector(state => state.ingredients.ingredients);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  // булочки
  const bun = useSelector(state => state.burgerConstructor.buns);
  // остальные ингредиенты
  const fillings = useSelector(state => state.burgerConstructor.fillings);

  // Логика открытия/закрытия модального окна с деталями заказа
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const createOrder = () => {
    const ingredientsId = ingredients.map(item => item._id);
    dispatch(getOrder(ingredientsId));
    setModalIsOpen(true);
  };

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (bun && bun._id === item._id) return;
      const ingredient = Object.assign({}, item);
      ingredient.uuid = uuidv4();
      dispatch(addIngredient(ingredient));
  }});

  const onDelete = (item, index) => {
    dispatch(deleteIngredient(index));
    // dispatch({ type: SUB_PRICE, price: item.price });
    // dispatch({ type: DEC_INGREDIENT_COUNT, ingredientId: item._id });
  };

  const [totalPriceState, dispatchTotalPrice] = React.useReducer(reducer, priceInitialState, undefined);

  // useEffect(() => {
  //   if (ingredients) {
  //     const totalPrice = bun ? (bun.price * 2 + fillings.reduce((total, item) => total + item.price, 0)) : fillings.reduce((total, item) => total + item.price, 0);
  //     dispatchTotalPrice({type: 'add', payload: totalPrice});
  //   }
  // }, [ingredients, bun, fillings])

  return (
      <section className={styles.constructor_box} ref={dropRef}>
        <div className={`mt-15 ${styles.constructor_container}`}>
          {bun ? (
              <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
                  extraClass={`ml-4`}
              />
              ) : null
          }

          <ul className={`custom-scroll ${styles.constructor_list}`}>
            {fillings.map((item, index) => {
              return (
                <MainIngredient key={item.uuid} index={index}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    onDelete={() => onDelete(item, index)}
                  />
                </MainIngredient>
              );
            })}
          </ul>

          {bun ? (
              < ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image}
                  extraClass={`ml-4`}
            />
            ) : null
          }
        </div>
        <div className={`mt-10 mr-4 ${styles.total}`}>
          <div className={styles.price}>
            <p className="text text_type_digits-medium"></p>
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