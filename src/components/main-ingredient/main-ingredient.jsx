import React, { useCallback, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from "../burger-constructor/burger-constructor.module.css";
import { ingredientPropType } from '../../utils/prop-types';
import { useDispatch } from "react-redux";
import { SORT_INGREDIENTS } from "../../services/actions/burger-constructor";

const MainIngredient = ({ children, index }) => {

  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: 'filling',
    item: { index }
  });

  const updateIngredientsOrder = useCallback(
      (dragIndex, hoverIndex) => {
        dispatch({ type: SORT_INGREDIENTS, dragIndex, hoverIndex });

      },
      [dispatch]
  );

  const [, dropRef] = useDrop({
    accept: "filling",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
      updateIngredientsOrder(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  return (
      <li className={styles.constructor_card} ref={dragDropRef}>
        {children}
      </li>
  )
}

export default MainIngredient;

MainIngredient.propTypes = {
  ingredient: ingredientPropType
}