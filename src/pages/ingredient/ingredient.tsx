import { useParams } from "react-router";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from './ingredient.module.css';
import { FC } from "react";
import { useSelector } from "../../services/types/hooks";

const Ingredient: FC = () => {

  const ingredientsList = useSelector((store) => store.ingredients.ingredients);
  const { ingredientId } = useParams();
  const ingredient = ingredientsList.find(item => item._id === ingredientId);

  if (ingredient) {
    return (
      <div className={`pt-30 ${styles.ingredient}`}>
        <p className='text text_type_main-large'>Детали ингредиента</p>
        <IngredientDetails />
      </div>
    );
}
  return null;
};

export default Ingredient;