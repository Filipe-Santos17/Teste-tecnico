import { InputBoxType } from "@/@types/components"
import ErroMsg from "./ErrorMsg"

export default function InputBox({ labelName, value, idName, error, ...others }: InputBoxType) {
  delete others.validate 
  
  return (
    <div className="flex items-start gap-2 flex-col w-full">
      <label className="text-xs leading-4 font-bold text-gray40" htmlFor={idName}>
        {labelName}
      </label>
      
      <input className={`bg-white rounded h-10 w-full p-3 outline-none border border-gray40 font-medium
      text-black text-sm leading-3 ${error && "!border-red"}`} id={idName} name={idName} {...others}/>

      {error && <ErroMsg erro={error}/>}
    </div>
  )
}