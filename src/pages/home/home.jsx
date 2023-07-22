import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import styles from './home.module.css';


export function HomePage() {

  return (
      <main className={`mt-10 mb-10 ${styles.main}`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
  )
}