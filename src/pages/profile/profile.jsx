import styles from './profile.module.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";

export function ProfilePage() {

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
                // onChange={onChange}
                // onBlur={onBlurName}
                icon={'EditIcon'}
                // value={form.name}
                name={'name'}
                // error={errorName}
                // ref={inputRef}
                // onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
            />
            <EmailInput
                placeholder={'Логин'}
                // onChange={onChange}
                // value={form.email}
                name="email"
                icon="EditIcon"
            />
            <Input
                type={'password'}
                placeholder={'Пароль'}
                // onChange={onChange}
                icon={'EditIcon'}
                // value={form.password ||  ''}
                name='password'
                error={false}
                // ref={inputRef}
                // onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"
            />
            <div className={styles.buttons}>
              <Button htmlType="button" type="secondary" size="large">
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          </form>
        </div>
      </div>
  )
}