import styles from "./loader.module.css";

export default function Loader() {
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
}