export interface typeUserLogin {
    email: string,
    password: string
}

export interface typeCreateUser {
    name: string
    email: string
    password: string
    two_factory?: boolean
}

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