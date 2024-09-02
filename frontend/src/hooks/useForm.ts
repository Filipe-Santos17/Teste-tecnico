import { useState } from "react";

const typesForm = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    msg: "Preencha um email válido",
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    msg: "A senha precisa ter 1 caracter maíusculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres",
  },
};

type TypesFormKeys = keyof typeof typesForm | "";

const useForm = (type: TypesFormKeys) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | boolean>("");

  function validate(value: string) {
    if (type === "" && value.length === 0) {
      setError("Preencha um valor");
      return false;
    } else if (type !== "" && typesForm[type] && !typesForm[type].regex.test(value)) {
      setError(typesForm[type].msg);
      return false;
    } else {
      setError(false);
      return true;
    }
  }

  function onChange({ currentTarget }: {currentTarget: HTMLInputElement}) {
    error && validate(currentTarget.value);
    setValue(currentTarget.value);
  }

  return {
    value,
    onChange,
    validate: () => validate(value), //Exporta como um método que se autoativa com o seu valor
    onBlur: () => validate(value), //Evento que ocorre ao clica e sair do elemento
    error,
  };
};

export default useForm;