import styles from './register.module.css';
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export function RegisterPage() {
  return (
    <div className={`mt-30 ${styles.register}`}>
      <h2 className={`text text_type_main-medium ${styles.heading}`}>Регистрация</h2>
      <form className={`mt-6 ${styles.form}`} action="">
        <Input
            type={'text'}
            placeholder={'Имя'}
            // onChange={onChange}
            icon={undefined}
            // value={value}
            name={'name'}
            error={false}
            // ref={inputRef}
            // onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
        />
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
          Зарегистрироваться
        </Button>
      </form>
      <p className={`pt-20 text text_type_main-default`}>Уже зарегистрированы?&#160;
        <Link to={'/login'} className={styles.link}>Войти</Link>
      </p>
    </div>
  )
}