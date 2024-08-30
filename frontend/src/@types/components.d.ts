import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export interface InputBoxType extends InputHTMLAttributes<HTMLInputElement> {
    labelName: string,
    idName: string,
    error?: string | boolean,
    validate?: () => void,
    setValue?: React.Dispatch<React.SetStateAction<string>>
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string,
  btnStyle?: string,
  typeBtn?: "submit" | "button"
}

