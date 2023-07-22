import styles from "./reset-password.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";


export function ResetPasswordPage() {
  return (
      <div className={`mt-30 ${styles.reset_password}`}>
        <h2 className={`text text_type_main-medium ${styles.heading}`}>Восстановление пароля</h2>
        <form className={`mt-6 ${styles.form}`} action="">
          <PasswordInput
              // value={form.password || ''}
              name={'password'}
              extraClass="mb-2"
              placeholder={'Введите новый пароль'}
              // onChange={onChange}
          />
          <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              // onChange={onChange}
              icon={undefined}
              // value={form.token || ''}
              // name={'token'}
              error={false}
              // ref={inputRef}
              // onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"
          />
          <Button htmlType="button" type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <p className={`pt-20 text text_type_main-default`}>Вспомнили пароль?&#160;
          <Link to={'/login'} className={styles.link}>Войти</Link>
        </p>
      </div>
  )
}