import { TokenGenerator, Account, SessionToken } from "../Server/Model";
import { SessionTokenDBA } from "./SessionTolenDBA";
import { UserCredentialsDBA } from "./UserCredentialesDBA";

export class Authorizer implements TokenGenerator{

    private userCredDBA: UserCredentialsDBA = new UserCredentialsDBA();
    private sessionTokenDBA: SessionTokenDBA = new SessionTokenDBA();

    public async generateToken(account: Account): Promise<SessionToken | undefined> {
        const resultAccount = await this.userCredDBA.getUserCredential(account.username, account.password);

        if(resultAccount){
            const token: SessionToken={
                accessRight: resultAccount.accessRight,
                expirationTime: this.generateExpirationTime(),
                username: resultAccount.username,
                valid: true,
                tokenId: this.generateRandomTokenId()
            };
            await this.sessionTokenDBA.storeSessionToken(token);
            return token;
        }else{
            return undefined;
        }
    }

    private generateExpirationTime(){
        return new Date(Date.now() + 60*60*1000);
    }

    private generateRandomTokenId(){
        return Math.random().toString(36).slice(2);
    }


}