import React from "react";
import styles from './ingredient-details.module.css'
import {ingredientPropType} from "../../utils/prop-types";

function IngredientDetails( { item }) {
  return (
      <div className={styles.container}>
        <img src={item.image} alt="Ингредиент"/>
        <p className={styles.title}>{item.name}</p>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <p>Калории,ккал</p>
            <p>{item.calories}</p>
          </li>
          <li className={styles.list_item}>
            <p>Белки, г</p>
            <p>{item.proteins}</p>
          </li>
          <li className={styles.list_item}>
            <p>Жиры, г</p>
            <p>{item.fat}</p>
          </li>
          <li className={styles.list_item}>
            <p>Углеводы, г</p>
            <p>{item.carbohydrates}</p>
          </li>
        </ul>
      </div>
  )
}

export default IngredientDetails;

// IngredientDetails.propTypes = {
//   item: ingredientPropType.isRequired
// };