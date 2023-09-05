import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import styles from './home.module.css';
import { FC } from "react";

const HomePage: FC = () => {

  return (
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
  )
};

export default HomePage;