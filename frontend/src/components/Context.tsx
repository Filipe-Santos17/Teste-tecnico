import { useState, useEffect, useCallback, createContext, ReactElement } from 'react'
import { validUser } from "@/helpers/ApiRoutes";

export const UserContext = createContext({});

export function UserStorage({ children }: { children: ReactElement }) {
  const [dados, setDados] = useState({});
  const [login, setLogin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean | string>(false);
  const [error, setError] = useState<boolean | string>(false);
  const [reload, setReload] = useState(0)

  const userLogout = useCallback(() => {
    setDados({});
    setError(false);
    setLoading(false);
    setLogin(false);
    localStorage.removeItem("token");
  }, []);

  useEffect(() => {
    async function testLogin() {
      const tokenLogin = localStorage.getItem('token')

      if (tokenLogin === null) {
        return setLogin(false)
      }

      try {
        setError(false)
        setLoading(true)

        const { url, options } = validUser(tokenLogin)
        const resp = await fetch(url, options)

        if (resp.status === 200) {
          const data = await resp.json()

          if (data.status === "ok") {
            setDados(data.user)
            console.log(data.user)
            setLogin(true)
          }
        } else {
          setDados({})
        }
      } catch (e) {
        userLogout()
        throw new Error("Token Invalido, error: " + e);
      } finally {
        setLoading(false)
      }
    }

    testLogin()
  }, [userLogout])

  if (loading) {
    return (
      <div>carregando...</div>
    )
  }

  if (error) {
    return (
      <div>erro...</div>
    )
  }

  if (login === null) {
    return null; // Espera o login estar pronto
  }

  return (
    <UserContext.Provider value={{ dados, login, userLogout, reload, setReload }}>
        {children}
    </UserContext.Provider>
  )
}