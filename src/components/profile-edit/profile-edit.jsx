import styles from "./profile-edit.module.css";
import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUser } from "../../services/actions/user";

const ProfileEdit = () => {

  const dispatch = useDispatch();
  const getUser = (store) => store.user.user;
  const user = useSelector(getUser);
  const [form, setForm] = useState({
    email: user.email,
    password: '',
    name: user.name
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onResetUserData = (e) => {
    e.preventDefault();
    setForm({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const onUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updateUser(form));
  };

  return (
      <section className={styles.container}>
        <form className={styles.form} onSubmit={onUpdateUser}>
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
          />
          <div className={form.name === user.name && form.email === user.email && form.password === ''
              ? `${styles.buttons}`
              :
              `${styles.buttons_active} mt-6`}>
            <Button htmlType="reset" type="secondary" size="large"  onClick={onResetUserData}>
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>
      </section>
  )
};

export default ProfileEdit;