import styles from "./reset-password.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { resetPassword} from "../../services/actions/user";


export function ResetPasswordPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: '',
    token: ''
  });
  const getResetRequest = (store) => store.user.resetPasswordSuccess;
  const resetRequest = useSelector(getResetRequest);

  useEffect(() => {
    if (resetRequest) {
      navigate('/login');
    }
  }, [navigate, resetRequest]);

  const onChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangePassword = useCallback(
      e => {
        e.preventDefault();
        if (form.password !== '' && form.token !== '') {
          dispatch(resetPassword(form));
        }
      }, [form, dispatch]
  );

  return (
      <div className={`mt-30 ${styles.reset_password}`}>
        <h2 className={`text text_type_main-medium ${styles.heading}`}>Восстановление пароля</h2>
        <form className={`mt-6 ${styles.form}`} onSubmit={onChangePassword}>
          <PasswordInput
              value={form.password}
              name={'password'}
              placeholder={'Введите новый пароль'}
              onChange={onChange}
          />
          <Input
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={onChange}
              value={form.token}
              name={'token'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </form>
        <p className={`pt-20 text text_type_main-default`}>Вспомнили пароль?&#160;
          <Link to={'/login'} className={styles.link}>Войти</Link>
        </p>
      </div>
  )
}