import { typeCreateUser, typeUserLogin, typeChangePassword } from "@/@types/dataJson"

const url = import.meta.env.MODE === "development" ? 'http://localhost:3001/api/' : import.meta.env.VITE_ROUTE_BACKEND

/*Rotas de Login */
export function loginUser(data: typeUserLogin) {
  return {
    url: `${url}/login`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    },
  }
}

export function createUser(data: typeCreateUser) {
  return {
    url: `${url}user/create`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    },
  }
}

export function changePass(data: typeChangePassword) {
  return {
    url: `${url}user/forget-password`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    },
  }
}

export function validUser(data: string) {
    return {
      url: `${url}user/valid-token`,
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorizarion": `${data}`
        },
      },
    }
  }