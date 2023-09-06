import styles from "./loader.module.css";
import { FC } from "react";

const Loader: FC = () => {
  return (
        <div className={styles.container}>
          <h2 className="text text_type_main-medium">Отправляю заказ на кухню...</h2>
          <div className={styles.loader}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
  );
};

export default Loader;