import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css'
import { Link } from "react-router-dom";
import { logIn } from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";
import { FC, FormEvent } from "react";
import { useDispatch } from "../../services/types/hooks";

const LoginPage: FC = () => {

  const dispatch = useDispatch();

  const { form, onChange } = useForm({
    email: '',
    password: ''
  });

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.email !== '' && form.password !== '') {
      dispatch(logIn(form));
    }
  };

  return (
      <div className={`mt-30 ${styles.login}`}>
        <h2 className={`text text_type_main-medium ${styles.heading}`}>Вход</h2>
        <form className={`mt-6 ${styles.form}`} onSubmit={login}>
          <EmailInput
              placeholder={'E-mail'}
              onChange={onChange}
              value={form.email}
              name={'email'}
          />
          <PasswordInput
              placeholder={'Пароль'}
              onChange={onChange}
              value={form.password}
              name={'password'}
          />
          <Button htmlType="submit" type="primary" size="medium">
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
};

export default LoginPage;