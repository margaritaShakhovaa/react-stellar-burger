import { ChangeEvent, useState } from "react";

interface IUseForm {
  [key: string]: string;
}

export const useForm = (inputValues: IUseForm) => {
  const [form, setForm] = useState(inputValues);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setForm({...form, [name]: value});
  };
  return { form, onChange, setForm };
};