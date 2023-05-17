import React from "react";
import styles from "./burger-ingredients.module.css";

class BurgerIngredients extends React.Component {
  render() {
    return (
        <section className={`mt-10 ${styles.ingredients_box}`}>
          <h1 className="text text_type_main-large">Собери бургер</h1>
        </section>
    )
  }
}

export default BurgerIngredients;