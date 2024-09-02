import { ButtonProps } from "@/@types/components"

export default function Button({content, btnStyle = "", typeBtn = "button", ...others}: ButtonProps) {
  return (
    <button className={`btn ${btnStyle}`} type={typeBtn} {...others}>
      {content}
    </button>
  )
}