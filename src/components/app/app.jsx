import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

  const [ingredients, setIngredients] = React.useState([] );

  React.useEffect(() => {
    getIngredientData();
  }, []);

  const getIngredientData = () => {
    fetch(apiUrl)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(res => setIngredients(res.data))
        .catch(error => console.log(error))
  }

  const data = ingredients;

  return (
      <div className={styles.app}>
        <AppHeader />
        <main className={`mt-10 mb-10 ${styles.main}`}>
          { data.length > 0 &&
              <>
                <BurgerIngredients data={data} />
                <BurgerConstructor data={data} />
              </>
          }
        </main>
      </div>
  );
}

export default App;
