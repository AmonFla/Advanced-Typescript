import { TokenGenerator, Account, SessionToken, TokenValidator, TokenRight, TokenState } from "../Server/Model";
import { logInvocation } from "../Shared/MethodDecorators";
import { countInstances } from "../Shared/ObjectCounter";
import { SessionTokenDBA } from "./SessionTolenDBA";
import { UserCredentialsDBA } from "./UserCredentialesDBA";

@countInstances
export class Authorizer implements TokenGenerator, TokenValidator{

    private userCredDBA: UserCredentialsDBA = new UserCredentialsDBA();
    private sessionTokenDBA: SessionTokenDBA = new SessionTokenDBA();

    @logInvocation
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

    public async validateToken(tokenId: string): Promise<TokenRight> {
        const token = await this.sessionTokenDBA.getSessionToken(tokenId);
        if(!token || !token.valid){
            return{
                accessRight: [],
                state: TokenState.INVALID
            }
        }else if (token.expirationTime < new Date()){
            return{
                accessRight: [],
                state: TokenState.EXPIRED
            }
        }else{
            return{
                accessRight: token.accessRight,
                state: TokenState.VALID
            }
        }
    }
}