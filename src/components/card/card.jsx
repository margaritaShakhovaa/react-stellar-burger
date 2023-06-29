import React from "react";
import styles from './card.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";

const Card = ( { card, onClick = () => {} }, type ) => {

  const ingredients = useSelector((state) => {
    return type === 'bun'
        ? state.burgerConstructor.buns
        : state.burgerConstructor.fillings
  });

  const counter = ingredients.filter(item =>
      item._id === card._id
  );

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: card,
  });

  return (
        <li className={styles.card} onClick={() => onClick(card)} ref={dragRef}>
          { !!counter.length && <Counter count={counter.length} size="default" extraClass={`m-1`} /> }
          <img className={styles.img} src={card.image} alt={card.name}/>
          <div className={styles.price}>
            <p className={`text text_type_digits-default pb-1 pt-1`}>{card.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`text text_type_main-default pt-1`}>{card.name}</p>
        </li>
  )
}

Card.propTypes = {
  card: ingredientPropType.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default Card;