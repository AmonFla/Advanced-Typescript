import { TokenGenerator, Account, SessionToken } from "../Server/Model";
import { UserCredentialsDBA } from "./UserCredentialesDBA";

export class Authorizer implements TokenGenerator{

    private userCredDBA: UserCredentialsDBA= new UserCredentialsDBA();

    public async generateToken(account: Account): Promise<SessionToken | undefined> {
        const resultAccount = await this.userCredDBA.getUserCredential(account.username, account.password);

        if(resultAccount){
            return {token:''};
        }else{
            return undefined;
        }
    }


}