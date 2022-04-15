import { AccessRight } from "../Sahred/Model"

export interface Account{
    username: string,
    password: string
}

export interface Handler{
    handlerRequest():void
}

export interface SessionToken{
    tokenId: string,
    username: string,
    valid: boolean,
    expirationTime: Date,
    accessRight: AccessRight[]
}

export interface TokenGenerator{
    generateToken(account: Account): Promise<SessionToken | undefined>
}