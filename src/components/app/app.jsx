import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../utils/burgers-api";
import { Context } from "../../services/Context";


function App() {

  const [ingredients, setIngredients] = React.useState([] );
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    getIngredients()
        .then(res => setIngredients(res.data))
        .catch(err => {
          setError("Sorry, something went wrong")
          console.log(err)})
  }, []);


  const data = ingredients;

  return (
     <Context.Provider value={ingredients}>
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
     </Context.Provider>
  );
}

export default App;
