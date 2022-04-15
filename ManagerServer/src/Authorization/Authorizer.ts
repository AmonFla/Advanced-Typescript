import { TokenGenerator, Account, SessionToken } from "../Server/Model";

export class Authorizer implements TokenGenerator{

    public async generateToken(account: Account): Promise<SessionToken | undefined> {
        if( account.username==='flavio' && account.password === '123456'){
            return {token:''};
        }else{
            return undefined;
        }
    }


}