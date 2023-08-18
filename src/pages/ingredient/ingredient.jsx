import { useSelector } from "react-redux";
import { useParams } from "react-router";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from './ingredient.module.css';

const Ingredient = () => {

  const getIngredientsList = (store) => store.ingredients.ingredients;
  const ingredientsList = useSelector(getIngredientsList);
  const { ingredientId } = useParams();
  const ingredient = ingredientsList.find(item => item._id === ingredientId);

  if (ingredient) {
    return (
      <div className={`pt-30 ${styles.ingredient}`}>
        <p className='text text_type_main-large'>Детали ингредиента</p>
        <IngredientDetails item={ingredient} />
      </div>
    );
}
  return null;
};

export default Ingredient;