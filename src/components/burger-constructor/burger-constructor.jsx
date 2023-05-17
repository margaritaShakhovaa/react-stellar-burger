import React from "react";
import styles from "./burger-constructor.module.css";

class BurgerConstructor extends React.Component {
  render() {
    return (
        <section className={`mt-25 ${styles.constructor_box}`}>
          <h2>Собери бургер</h2>
        </section>
    )
  }
}

export default BurgerConstructor;