import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import { NavLink, useLocation } from "react-router-dom";

const AppHeader = () => {

  const { pathname } = useLocation();

  return (
      <header className={styles.header}>
        <nav className={styles.menu}>
          <div className={styles.left_menu}>
            <NavLink
                to={{ pathname: `/` }}
                className={`pt-4 pr-5 pb-4 pl-5 ${styles.menu_item}`}>
              <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
              <p className={
                `text_type_main-default ${pathname === '/'
                    ? "text_color_primary"
                    : "text_color_inactive"}`
              }>
                Конструктор
              </p>
            </NavLink>


            <NavLink
                to={{ pathname: `/feed` }}
                className={`pt-4 pr-5 pb-4 pl-5 ${styles.menu_item}`}>
              <ListIcon type={pathname === '/feed' ? "primary" : "secondary"} />
              <p className={
                `text_type_main-default ${pathname === '/feed'
                    ? "text_color_primary"
                    : "text_color_inactive"}`
              }>
                Лента заказов
              </p>
            </NavLink>
          </div>

        <NavLink
            to={{ pathname: `/` }}
            className={styles.logo}>
          <Logo />
        </NavLink>

        <div>
          <NavLink
              to={{ pathname: `/profile/orders` }}
              className={`pt-4 pr-5 pb-4 pl-4 ${styles.menu_item}`}>
            <ProfileIcon type={pathname === '/profile/orders' || pathname === '/profile' ? "primary" : "secondary"} />
            <p className={
              `text_type_main-default ${pathname === '/profile/orders' || pathname === '/profile'
                  ? "text_color_primary" 
                  : "text_color_inactive"}`
            }>
              Личный кабинет
            </p>
          </NavLink>
        </div>
        </nav>
      </header>
    )
};

export default AppHeader;
