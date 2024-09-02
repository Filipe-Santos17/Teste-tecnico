import { iCreateUser, typeUserLogin, typeChangePassword, typeGetAllDataTodo, iCreateTodo, iDeleteTodo, iModifyTodo } from "@/@types/dataJson"

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

export function createUser(data: iCreateUser) {
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

export function validUser(token: string, email: string) {
  return {
    url: `${url}login/valid-token`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`
      },
      body: JSON.stringify({ email })
    },
  }
}

export function getAllDataTodo({ token, userId }: typeGetAllDataTodo) {
  return {
    url: `${url}todos/${userId}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`
      },
    },
  }
}

export function createDataTodo({ token, todo }: iCreateTodo) {
  return {
    url: `${url}todos/create/`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`
      },
      body: JSON.stringify(todo)
    },
  }
}

export function deleteTodo({ userId, id, token }: iDeleteTodo) {
  return {
    url: `${url}todos/delete/${userId}/${id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`
      },
    },
  }
}

export function modifyDataTodo({ userId, id, token, todo }: iModifyTodo) {
  return {
    url: `${url}todos/modify/${userId}/${id}`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`
      },
    },
    body: JSON.stringify(todo),
  }
}
