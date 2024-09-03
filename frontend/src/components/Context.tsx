import { useState, useEffect, useCallback, createContext, ReactElement } from 'react'

import { validUser } from "@/helpers/ApiRoutes";

import CookiesWork from '@/utils/cookies';

import useFetch from '@/hooks/useFetch';

import { iUser, iValidUser } from '@/@types/dataJson';

export const UserContext = createContext({});

export function UserStorage({ children }: { children: ReactElement }) {
  const [dados, setDados] = useState({});
  const [login, setLogin] = useState<boolean | null>(null);
  const Cookies = CookiesWork()
  const { load, erro, request } = useFetch()

  const userLogout = useCallback(() => {
    setDados({});
    setLogin(false);
    Cookies.deleteCookie("token-todo-api")
    Cookies.deleteCookie("token-todo-user")
  }, []);

  useEffect(() => {
    async function testLogin() {
      const tokenLogin = Cookies.getCookie('token-todo-api');
      const tokenUser = Cookies.getCookie('token-todo-user');

      if (!tokenLogin || !tokenUser) {
        return setLogin(false)
      }

      try {
        const dataUser: iUser = JSON.parse(tokenUser);
        const { url, options } = validUser(tokenLogin, dataUser.email)
        const { json, response } = await request<iValidUser>(url, options)

        if ((await response).status == 200) {
          setDados(json.user)
          setLogin(true)
        } else {
          setDados({})
          throw new Error(json.msg)
        }
      } catch (e) {
        userLogout()
        throw new Error("Token Invalido, error: " + e);
      } 
    }

    testLogin()
  }, [userLogout])

  if (load) {
    return (
      <div>carregando...</div>
    )
  }

  if (erro) {
    return (
      <div>erro...</div>
    )
  }

  if (login === null) {
    return null; // Espera o login estar pronto
  }

  return (
    <UserContext.Provider value={{ dados, login, userLogout }}>
      {children}
    </UserContext.Provider>
  )
}