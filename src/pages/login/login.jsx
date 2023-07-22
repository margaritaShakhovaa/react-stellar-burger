import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import styles from './login.module.css'
import {Link} from "react-router-dom";


export function LoginPage() {

  // const [form, setValue] = useState({ email: '', password: '' })
  //
  // const onChange = e => {
  //   setValue({ ...form, [e.target.name]: e.target.value });
  // };

  return (
      <div className={`mt-30 ${styles.login}`}>
        <h2 className={`text text_type_main-medium ${styles.heading}`}>Вход</h2>
        <form className={`mt-6 ${styles.form}`} action="">
          <EmailInput
              placeholder={'E-mail'}
              // onChange={onChange}
              // value={form.email}
              name={'email'}
              isIcon={false}
          />
          <PasswordInput
              // onChange={onChange}
              // value={form.password}
              name={'password'}
              extraClass="mb-2"
          />
          <Button htmlType="button" type="primary" size="medium">
            Войти
          </Button>
        </form>
        <p className={`pt-20 text text_type_main-default`}>Вы — новый пользователь?&#160;
          <Link to={'/register'} className={styles.link}>Зарегистрироваться</Link>
        </p>
        <p className={`pt-4 text text_type_main-default`}>Забыли пароль?&#160;
          <Link to={'/forgot-password'} className={styles.link}>Восстановить пароль</Link>
        </p>
      </div>
  )
}