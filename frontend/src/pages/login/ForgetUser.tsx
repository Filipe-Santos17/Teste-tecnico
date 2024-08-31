import { FormEvent, useState } from "react"
import { Link } from "react-router-dom"

import useForm from "@/hooks/useForm"
import useFetch from "@/hooks/useFetch"

import InputBox from "@/components/generics/InputBox"
import Button from "@/components/generics/Button"
import ErroMsg from "@/components/generics/ErrorMsg"

import { changePass } from "@/helpers/ApiRoutes"

export default function ForgetUser() {
  const emailForm = useForm('email')
  const [sendEmail, setSendEmail] = useState(false)
  const { load, erro, request } = useFetch()

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault()

    if (emailForm.validate()) {
      const { url, options } = changePass({
        email: emailForm.value,
      })

      const { response } = await request(url, options)

      if ((await response).status == 200) {//json.status ok também
        setSendEmail(true)
      }
    }
  }

  return (
    <>
      {!sendEmail ?
        <form onSubmit={handleSubmitForm} className="form-login">
          <div className="flex items-start gap-4 flex-col">
            <h1 className="text-2xl text-[#000112]">Alterar Senha</h1>
            <p className="text-base text-[#364b5a]">Insira seu e-mail e enviaremos o link para alterar sua senha.</p>
          </div>
          <div className="flex items-start gap-6 flex-col">
            <InputBox labelName="Email" idName="email" type="text" placeholder="Insira seu email" autoFocus {...emailForm} />
            {erro && <ErroMsg erro={erro} />}
            <div className="flex items-start gap-2 flex-col">
              <Link to="/login" className="forget-password">Voltar ao login</Link>
              <Link to="/login/create" className="forget-password">Não possuo cadastro</Link>
            </div>
          </div>
          {load ? <Button content="Carregando..." disabled /> : <Button content="Enviar" typeBtn="submit" />}
        </form>
        :
        <div className="form-login">
          <div className="flex items-start gap-4 flex-col">
            <h1>Email enviado com sucesso</h1>
            <p>Confira sua caixa de email, em alguns instantes o link para para a alterção irá ser enviado, por favor consulte sua caixa de span.</p>
          </div>
          <Link to={'/login'}>
            <Button content="Voltar ao login" />
          </Link>
        </div>
      }
    </>
  )
}