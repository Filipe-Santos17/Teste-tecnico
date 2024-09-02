export interface iContext {
    dados: iUser,
    login: boolean
    userLogout: () => void
}

export interface iUser {
    id: string,
    name: string,
    email: string,
}

export interface iCreateUser {
    name: string
    email: string
    password: string
    two_factory?: boolean
}

//Todos
export interface iTodo {
    id: string,
    task_description: string,
    task_title: string,
    complete: boolean,
}

type typeTodo = Omit<iTodo, "id">

export type typeGetAllDataTodo = {
    token: string,
    userId: string
}

export interface iCreateTodo {
    token: string
    todo: typeTodo
}

export interface iDeleteTodo {
    userId: string
    id: string
    token: string
}

export interface iModifyTodo extends iDeleteTodo {
    todo: iTodo
}

//Login
export type typeUserLogin = Pick<iCreateUser, "email" | "password">

export type typeChangePassword = Pick<iCreateUser, "email">

export interface iValidUser {
    status: "ok",
    user: iUser,
    msg: string,
}

export interface iDataJsonLogin extends iValidUser {
    token: string,
}

