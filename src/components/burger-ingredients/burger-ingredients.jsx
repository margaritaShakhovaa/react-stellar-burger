import React, {useEffect} from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Card from '../card/card';
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import { useInView } from "react-intersection-observer";

const BurgerIngredients = () => {

  const dispatch = useDispatch();

  // Чтение ингредиентов из стора
  const getBurgerIngredients = (store) => store.ingredients.ingredients;
  const ingredients = useSelector(getBurgerIngredients);

  const bun = React.useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients]);
  const sauces = React.useMemo(() => ingredients.filter(item => item.type === 'sauce'), [ingredients]);
  const main = React.useMemo(() => ingredients.filter(item => item.type === 'main'), [ingredients]);

  useEffect(() => {
    dispatch(getIngredients())
  }, []);

  // Логика переключения табов
  const [current, setCurrent] = React.useState('bun');

  const [bunRef, bunInView, bunTab] = useInView({ threshold: 0 });
  const [saucesRef, saucesInView, saucesTab] = useInView({ threshold: 0 });
  const [mainRef, mainInView, mainTab] = useInView({ threshold: 0 });

  useEffect(() => {
    bunInView && setCurrent('bun');
    saucesInView && setCurrent('sauce');
    mainInView && setCurrent('main');
  }, [bunInView, saucesInView, mainInView]);

  const switchTab = (tab, entry) => {
    setCurrent(tab);
    entry.target.scrollIntoView({ behavior: 'smooth' });
  }

  return (
        <section className={styles.ingredients_box}>
          <h1 className="text text_type_main-large">Собери бургер</h1>
          <div className={`mt-5 mb-10`} style={{ display: 'flex' }}>
            <Tab
                value="bun"
                active={current === 'bun'}
                onClick={() => switchTab('bun', bunTab)}>
              Булки
            </Tab>
            <Tab
                value="sauce"
                active={current === 'sauce'}
                onClick={() => switchTab('sauce', saucesTab)}>
              Соусы
            </Tab>
            <Tab
                value="main"
                active={current === 'main'}
                onClick={() => switchTab('main', mainTab)}>
              Начинки
            </Tab>
          </div>

          <ul className={`${styles.ingredients} custom-scroll`}>
            <h3 className={`mb-6 text text_type_main-medium`} ref={bunRef}>Булки</h3>
            <ul className={`pr-2 pl-4 ${styles.card}`}>
              {bun.map((item) => (
                  <Card card={item} key={item._id} />
              ))}
            </ul>
            <h3 className={`mt-10 mb-6 text text_type_main-medium`} ref={saucesRef}>Соусы</h3>
            <ul className={`pr-2 pl-4 ${styles.card}`}>
              {sauces.map((item) => (
                  <Card card={item} key={item._id}/>
              ))}
            </ul>
            <h3 className={`mt-10 mb-6 text text_type_main-medium`} ref={mainRef}>Начинки</h3>
            <ul className={`pr-2 pl-4 ${styles.card}`}>
              {main.map((item) => (
                  <Card card={item} key={item._id} />
              ))}
            </ul>
          </ul>
        </section>
  )
};

export default BurgerIngredients;