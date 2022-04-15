import { UserCredentials } from "../Sahred/Model";

export class UserCredentialsDBA{
    public async putUserCredential(userCredential: UserCredentials): Promise<any>{

    }
    
    public async getUserCredential(username:string, password:string): Promise<UserCredentials | undefined>{}
}