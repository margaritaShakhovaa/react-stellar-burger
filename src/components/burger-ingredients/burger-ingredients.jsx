import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Card from '../card/card';

const BurgerIngredients = (props) => {

  const ingredients = props.data;

  const bread = ingredients.filter(item => item.type === 'bun');
  const sauces = ingredients.filter(item => item.type === 'sauce');
  const fillings = ingredients.filter(item => item.type === 'main');

  const [current, setCurrent] = React.useState('one');

    return (
          <section className={`mb-10 ${styles.ingredients_box}`}>
            <h1 className="text text_type_main-large">Собери бургер</h1>
            <div className={`mt-5`} style={{ display: 'flex' }}>
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

            <ul className={`${styles.ingredients} custom-scroll`}>
              <h3 className={`mt-10 mb-6 text text_type_main-medium ${styles.bread}`}>Булки</h3>
              <li className={styles.card}>
                {bread.map((item) => (
                    <Card card={item} key={item._id} />
                ))}
              </li>
              <h3 className={`mt-10 mb-6 text text_type_main-medium ${styles.sauce}`}>Соусы</h3>
              <li className={styles.card}>
                {sauces.map((item) => (
                    <Card card={item} key={item._id} />
                ))}
              </li>
              <h3 className={`mt-10 mb-6 text text_type_main-medium ${styles.filling}`}>Начинки</h3>
              <li className={styles.card}>
                {fillings.map((item) => (
                    <Card card={item} key={item._id} />
                ))}
              </li>
            </ul>
          </section>
    )
}

export default BurgerIngredients;