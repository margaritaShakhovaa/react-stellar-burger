import styles from './profile.module.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../services/actions/user";

export function ProfilePage() {

  const dispatch = useDispatch();
  const getUser = (store) => store.user.user;
  const user = useSelector(getUser);
  const [form, setValue] = useState({
    email: user.email,
    password: '',
    name: user.name
  });

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onResetUserData = (e) => {
    e.preventDefault();
    setValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const onSubmitUserData = (e) => {
    e.preventDefault();
    dispatch(updateUser(form.email, form.name));
  }

  const [current, setCurrent] = useState('profile');

  return (
      <div className={styles.container}>
        <div className={`mt-30 ${styles.profile}`}>
          <div className={styles.links}>
            <Link
                to='/profile'
                className={`${styles.link} ${current === 'profile' ? styles.current_link : ''}`}
                onClick={() => setCurrent('profile')}>
              <p className='text text_type_main-medium'>Профиль</p>
            </Link>
            <Link
                to='/profile/orders'
                className={`${styles.link} ${current === 'orders' ? styles.current_link : ''}`}
                onClick={() => setCurrent('orders')}>
              <p className='text text_type_main-medium'>История заказов</p>
            </Link>
            <Link
                to='/login'
                className={`${styles.link} ${current === 'exit' ? styles.current_link : ''}`}
                onClick={() => setCurrent('exit')}>
              <p className='text text_type_main-medium'>Выход</p>
            </Link>
            <p className={`pt-20 text text_type_main-default text_color_inactive ${styles.text}`}>В этом разделе вы можете просмотреть свою историю заказов</p>
          </div>
          <form className={styles.form}>
            <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onChange}
                icon={'EditIcon'}
                value={form.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
            />
            <EmailInput
                placeholder={'Логин'}
                onChange={onChange}
                value={form.email}
                name="email"
                icon="EditIcon"
            />
            <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={onChange}
                icon={'EditIcon'}
                value={form.password}
                name='password'
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
            />
            <div className={styles.buttons}>
              <Button htmlType="reset" type="secondary" size="large"  onClick={onResetUserData}>
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="medium" onClick={onSubmitUserData}>
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      </div>
  )
}