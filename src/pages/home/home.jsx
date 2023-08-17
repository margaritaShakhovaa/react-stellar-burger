import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import styles from './home.module.css';

const HomePage = () => {

  return (
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
  )
};

export default HomePage;