import styles from "./profile-edit.module.css";
import { Button, EmailInput, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUser } from "../../services/actions/user";
import { useForm } from "../../hooks/useForm";
import { FC, FormEvent } from "react";
import { useDispatch, useSelector } from "../../services/types/hooks";

const ProfileEdit: FC = () => {

  const dispatch = useDispatch();
  const { name, email } = useSelector((store) => store.user);
  const { form, onChange, setForm } = useForm({
    email: email,
    password: '',
    name: name
  });

  const onResetUserData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm({
      name: name,
      email: email,
      password: ''
    });
  };

  const onUpdateUser = (e: FormEvent<HTMLFormElement>) => {
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
              // @ts-ignore
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
          <div className={form.name === name && form.email === email && form.password === ''
              ? `${styles.buttons}`
              :
              `${styles.buttons_active} mt-6`}>
            <Button htmlType="reset" type="secondary" size="large" onClick={() => onResetUserData}>
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