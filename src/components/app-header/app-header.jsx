import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink } from "react-router-dom";

function AppHeader () {
  return (
      <header className={styles.header}>
        <nav className={styles.menu}>
          <NavLink
              to={{ pathname: `/` }}
              className={`pt-4 pr-5 pb-4 pl-5 ${styles.menu_item}`}
          >
            {({isActive}) => (
                <>
                  <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  <p className={
                     `text_type_main-default ${isActive 
                         ? "text_color_primary" 
                         : "text_color_inactive"}`
                  }>
                    Конструктор
                  </p>
                </>
            )}
          </NavLink>


          <NavLink
              to={{ pathname: `/orders` }}
              className={`pt-4 pr-5 pb-4 pl-5 ${styles.menu_item}`}
          >
            {({isActive}) => (
                <>
                  <ListIcon type={isActive ? "primary" : "secondary"} />
                  <p className={
                    `text_type_main-default ${isActive
                        ? "text_color_primary"
                        : "text_color_inactive"}`
                  }>
                    Лента заказов
                  </p>
                </>
            )}
          </NavLink>
        </nav>

        <div className={styles.logo}>
          <Logo />
        </div>

        <div>
          <NavLink
              to={{ pathname: `/profile` }}
              className={`pt-4 pr-5 pb-4 pl-4 ${styles.menu_item}`}
          >
            {({isActive}) => (
                <>
                  <ProfileIcon type={isActive ? "primary" : "secondary"} />
                  <p className={
                    `text_type_main-default ${isActive
                        ? "text_color_primary"
                        : "text_color_inactive"}`
                  }>
                    Личный кабинет
                  </p>
                </>
            )}
          </NavLink>
        </div>
      </header>
    )
}

export default AppHeader;
