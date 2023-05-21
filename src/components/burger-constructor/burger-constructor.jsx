import React from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";

const calcTotal = (items) => {
  let total = 0;
  items.forEach((ingredient) => {
    total += ingredient.price;
  })
  return total;
}

const BurgerConstructor = (props) => {

    const ingredients = props.data;
    const bread = ingredients.find(item => item.type === 'bun');

    return (
        <section className={styles.constructor_box}>
            <div className={`mt-15 ${styles.constructor_container}`}>

                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bread.name} (верх)`}
                    price={bread.price}
                    thumbnail={bread.image}
                    extraClass={`ml-2`}
                />


              <ul className={`custom-scroll ${styles.constructor_list}`}>
                {ingredients.map((item) => {
                if (item.type !== 'bun') {
                  return (
                      <li className={styles.constructor_card} key={item._id}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                        />
                      </li>
                  )}}
                )}
              </ul>

                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bread.name} (низ)`}
                    price={bread.price}
                    thumbnail={bread.image}
                    extraClass={`ml-2`}
                />

            </div>
          <div className={`mt-10 mr-4 ${styles.total}`}>
            <div className={styles.price}>
              <p className="text text_type_digits-medium">{calcTotal(ingredients)}</p>
              <CurrencyIcon type="primary" />
            </div>
            <Button htmlType="button" type="primary" size="large">
              Оформить заказ
            </Button>
          </div>
        </section>
    )
}

export default BurgerConstructor;