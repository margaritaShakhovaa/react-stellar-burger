import styles from './profile.module.css';
import {NavLink, Outlet, useLocation} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../services/actions/user";

const ProfilePage = () => {

  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logOut(localStorage.getItem('refreshToken')));
  };

  return (
      <div className={styles.container}>
        <div className={`mt-30 ${styles.profile}`}>
          <div className={styles.links}>
            <NavLink
                to='/profile'
                className={pathname === '/profile'
                    ? `${styles.link} ${styles.current_link}`
                    : `${styles.link}`} >
              <p className='text text_type_main-medium'>Профиль</p>
            </NavLink>
            <NavLink
                to='/profile/orders'
                className={pathname === '/profile/orders'
                    ? `${styles.link} ${styles.current_link}`
                    : `${styles.link}`} >
              <p className='text text_type_main-medium'>История заказов</p>
            </NavLink>
            <li
                className={styles.link}
                onClick={onLogout}>
              <p className='text text_type_main-medium'>Выход</p>
            </li>
            {
              pathname === '/profile'
                  ? <p className={`pt-20 text text_type_main-default text_color_inactive ${styles.text}`}>В этом разделе вы можете
                    изменить свои персональные данные</p>
                  : pathname === '/profile/orders'
                      ?
                      <p className={`pt-20 text text_type_main-default text_color_inactive ${styles.text}`}>В этом разделе вы можете просмотреть свою историю заказов</p>
                      : ''
            }
          </div>
        </div>
        <Outlet />
      </div>
  )
};

export default ProfilePage;