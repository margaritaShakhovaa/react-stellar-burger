import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

class AppHeader extends React.Component {
  render() {
    return (
        <header className={styles.header}>
          <div className={styles.menu}>
            <div className={`pt-4 pr-5 pb-4 pl-5 ${styles.menu_item}`}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-small">Конструктор</p>
            </div>
            <div className={`pt-4 pr-5 pb-4 pl-5 ${styles.menu_item}`}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-small text_color_inactive">Лента заказов</p>
            </div>
          </div>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div>
            <div className={`pt-4 pr-5 pb-4 pl-4 ${styles.menu_item}`}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-small text_color_inactive">Личный кабинет</p>
            </div>
          </div>
        </header>
    )
  }
}

export default AppHeader;
