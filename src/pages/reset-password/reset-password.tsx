import styles from "./reset-password.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { FC, useCallback, useEffect } from "react";
import { resetPassword} from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "../../services/types/hooks";

const ResetPasswordPage: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, onChange } = useForm({
    password: '',
    token: ''
  });

  const isPasswordChanged = useSelector((store) => store.user.isPasswordChanged);

  useEffect(() => {
    if (!isPasswordChanged) {
      console.log(!isPasswordChanged);
      navigate('/');
    }
  }, [navigate, isPasswordChanged]);

  const onChangePassword = useCallback(
      e => {
        e.preventDefault();
        if (form.password !== '' && form.token !== '') {
          dispatch(resetPassword(form));
          navigate('/login');
        }
      }, [form, dispatch, navigate]
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
};

export default ResetPasswordPage;