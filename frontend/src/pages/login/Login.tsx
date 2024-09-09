import { FormEvent, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

import useForm from "@/hooks/useForm"
import useFetch from "@/hooks/useFetch"

import InputBox from "@/components/generics/InputBox"
import Button from "@/components/generics/Button"
import ErroMsg from "@/components/generics/ErrorMsg"

import { loginUser } from "@/helpers/ApiRoutes"
import CookiesWork from "../../utils/cookies"
import { iDataJsonLogin } from "@/@types/dataJson"

export default function LoginUser() {
  const emailForm = useForm('email')
  const passwordForm = useForm('password')
  const { load, erro, request } = useFetch()
  const navigate = useNavigate()
  const cookies = CookiesWork()

  useEffect(() => {
    window.document.title = 'Login Todo'
  }, [])

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault()

    if (emailForm.validate() && passwordForm.validate()) {
      const { url, options } = loginUser({
        email: emailForm.value,
        password: passwordForm.value,
      })

      const { json, response } = await request<iDataJsonLogin>(url, options)

      if ((await response).status == 200) {
        if (json.token) {
          cookies.setCookie('token-todo-api', json.token)
          cookies.setCookie('token-todo-user', JSON.stringify(json.user))
          setTimeout(() => navigate('/user'), 2000) //Tempo de espera garante o salvamento do token
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmitForm} className="form-login">
      <div className="flex items-start gap-4 flex-col">
        <h1 className="text-2xl text-[#000112]">Fazer Login</h1>
        <p className="text-base text-[#364b5a]">
          Seja bem-vindo(a)!  Insira seu e-mail e senha para entrar em sua conta.
        </p>
      </div>
      <div className="flex items-start gap-6 flex-col">
        <InputBox labelName="Usuário" idName="email" type="text" placeholder="Insira seu email" {...emailForm} autoFocus />
        <InputBox labelName="Senha" idName="password" type="password" placeholder="Insira sua senha " {...passwordForm} />
        {erro && <ErroMsg erro={erro} />}
        <div className="flex items-start gap-2 flex-col">
          <Link to="forget/" className="forget-password">Esqueceu a senha ?</Link>
          <Link to="create/" className="forget-password">Não possuo cadastro</Link>
        </div>
      </div>
      {load ? <Button content="Carregando..." disabled /> : <Button content="Entrar" typeBtn="submit" />}
    </form>
  )
}