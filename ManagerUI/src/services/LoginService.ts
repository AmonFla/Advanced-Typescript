import { SessionToken } from "../models/AuthenticationModel"

export class LoginService{

    public async login(username:string, password: string): Promise<SessionToken | undefined>{
        if(username == 'user' && password == '123'){
            return {
                username: "some user"
            } as any
        }else{
            return undefined
        }
    }
}