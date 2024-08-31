import { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"

import useForm from "@/hooks/useForm"
import useFetch from "@/hooks/useFetch"

import InputBox from "@/components/generics/InputBox"
import Button from "@/components/generics/Button"
import ErroMsg from "@/components/generics/ErrorMsg"

import { createUser } from "@/helpers/ApiRoutes"

export default function CreateUser() {
  const nameForm = useForm('')
  const emailForm = useForm('email')
  const passwordForm = useForm('password')
  const { load, erro, request } = useFetch()
  const navigate = useNavigate()

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault();

    const isValid = emailForm.validate() && passwordForm.validate() && nameForm.validate()

    if (isValid) {
      const { url, options } = createUser({
        name: nameForm.value,
        email: emailForm.value,
        password: passwordForm.value,
      });

      const { response } = await request(url, options)

      if ((await response).status == 201) {
        navigate('/login')
      }
    }
  }

  return (
    <form onSubmit={handleSubmitForm} className="form-login">
      <div className="flex items-start gap-4 flex-col">
        <h1 className="text-2xl text-[#000112]">Crie seu usuário</h1>
        <p className="text-base text-[#364b5a]">Seja bem-vindo(a)!  Insira seu nome, e-mail e senha para criar sua conta.</p>
      </div>
      <div className="flex items-start gap-6 flex-col">
        <InputBox labelName="Nome" idName="user" type="text" placeholder="Insira seu nome" autoFocus {...nameForm} />
        <InputBox labelName="Email" idName="email" type="text" placeholder="Insira seu email" {...emailForm} />
        <InputBox labelName="Senha" idName="password" type="password" placeholder="Insira sua senha" {...passwordForm} />
        {erro && <ErroMsg erro={erro} />}
        <div className="flex items-start gap-2 flex-col">
          <Link to="/login/forget" className="forget-password">Esqueceu a senha ?</Link>
          <Link to="/login" className="forget-password">Fazer Login</Link>
        </div>
      </div>
      {load ? <Button content="Carregando..." disabled /> : <Button content="Enviar" typeBtn="submit" />}
    </form>
  )
}