
export interface Account{
    username: string,
    password: string
}

export interface Handler{
    handlerRequest():void
}

export interface SessionToken{
    token: string
}

export interface TokenGenerator{
    generateToken(account: Account): Promise<SessionToken | undefined>
}