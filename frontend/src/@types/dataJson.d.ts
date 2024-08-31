export interface typeCreateUser {
    name: string
    email: string
    password: string
    two_factory?: boolean
}

export type typeUserLogin = Pick<typeCreateUser, "email" | "password">

export type typeChangePassword = Pick<typeCreateUser, "email">

export interface DataJson {
    status: 'ok',
    msg: string,
    token: string,
    user: {
        email: string,
        id: number,
        name: string,
    }
}