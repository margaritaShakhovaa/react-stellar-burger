import styles from "./forgot-password.module.css";
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function ForgotPasswordPage() {
  return (
    <div className={`mt-30 ${styles.forgot_password}`}>
      <h2 className={`text text_type_main-medium ${styles.heading}`}>Восстановление пароля</h2>
      <form className={`mt-6 ${styles.form}`} action="">
        <EmailInput
            placeholder={'Укажите e-mail'}
            // onChange={onChange}
            // value={form.email}
            name={'email'}
            isIcon={false}
        />
        <Button htmlType="button" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p className={`pt-20 text text_type_main-default`}>Вспомнили пароль?&#160;
        <Link to={'/login'} className={styles.link}>Войти</Link>
      </p>
    </div>
  )
}