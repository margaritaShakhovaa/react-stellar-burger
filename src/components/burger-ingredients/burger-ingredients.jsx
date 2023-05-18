import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredients (props) {

  const ingredients = props.data;

  const bread = ingredients.filter(item => item.type === 'bun');
  const sauces = ingredients.filter(item => item.type === 'sauce');
  const fillings = ingredients.filter(item => item.type === 'main');

  const [current, setCurrent] = React.useState('one');

    return (
        <>
          <section className={styles.ingredients_box}>
            <h1 className="text text_type_main-large">Собери бургер</h1>
            <div className={`mt-5 ${styles.filter}`}>
              <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
              </Tab>
              <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
              </Tab>
              <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинки
              </Tab>
            </div>
            <ul className={`custom-scroll ${styles.ingredients}`}>
              <h3 className={`mt-10 mb-6 text text_type_main-medium ${styles.bread}`}>Булки</h3>
              <h3 className={`mt-10 mb-6 text text_type_main-medium ${styles.sauce}`}>Соусы</h3>
              <h3 className={`mt-10 mb-6 text text_type_main-medium ${styles.filling}`}>Начинки</h3>
            </ul>
          </section>
        </>
    )
}

export default BurgerIngredients;