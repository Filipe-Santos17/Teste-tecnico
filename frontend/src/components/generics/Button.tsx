import { ButtonProps } from "@/@types/components"

export default function Button({content, btnStyle = "", typeBtn = "button", ...others}: ButtonProps) {
  return (
    <button className={`h-12 w-full border cursor-pointer px-4 py-0 rounded border-solid 
    border-transparent bg-primary outline-none font-bold text-white text-base ${btnStyle} 
    disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purpleLigth`} 
    type={typeBtn} {...others}>
        {content}
    </button>
  )
}