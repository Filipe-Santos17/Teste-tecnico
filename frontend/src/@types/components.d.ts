import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import { iTodo } from "./dataJson";

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

export type TypeChangeModalState = { 
  changeModal: Dispatch<SetStateAction<boolean>> 
  currentTodo: iTodo
  setCurrentTodo: React.Dispatch<React.SetStateAction<iTodo | null>>
  handleEditTodo(id: string, todo: iTodo): Promise<void>
}