
export interface Account{
    username: string,
    password: string
}

export interface Handler{
    handlerRequest():void
}