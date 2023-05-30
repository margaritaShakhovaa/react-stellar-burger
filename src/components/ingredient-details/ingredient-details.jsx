import React from "react";
import styles from './ingredient-details.module.css'
import {ingredientPropType} from "../../utils/prop-types";

function IngredientDetails( { item } ) {
  return (
      <div className={styles.container}>
        <img className={styles.image} src={item.image} alt="Ингредиент"/>
        <p className={'mt-4 text text_type_main-medium'}>{item.name}</p>
        <ul className={`mt-8 ${styles.list}`}>
          <li className={styles.list_item}>
            <p className={'text text_type_main-default text_color_inactive'}>Калории,ккал</p>
            <p className={'text text_type_main-default text_color_inactive'}>{item.calories}</p>
          </li>
          <li className={styles.list_item}>
            <p className={'text text_type_main-default text_color_inactive'}>Белки, г</p>
            <p className={'text text_type_main-default text_color_inactive'}>{item.proteins}</p>
          </li>
          <li className={styles.list_item}>
            <p className={'text text_type_main-default text_color_inactive'}>Жиры, г</p>
            <p className={'text text_type_main-default text_color_inactive'}>{item.fat}</p>
          </li>
          <li className={styles.list_item}>
            <p className={'text text_type_main-default text_color_inactive'}>Углеводы, г</p>
            <p className={'text text_type_main-default text_color_inactive'}>{item.carbohydrates}</p>
          </li>
        </ul>
      </div>
  )
}

export default IngredientDetails;

IngredientDetails.propTypes = {
  item: ingredientPropType.isRequired,
};