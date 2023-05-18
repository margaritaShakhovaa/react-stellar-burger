import React from "react";
import styles from "./burger-constructor.module.css";

class BurgerConstructor extends React.Component {
  render() {
    return (
        <section className={styles.constructor_box}>
          <h2 className={styles.title}>Собери бургер</h2>
        </section>
    )
  }
}

export default BurgerConstructor;