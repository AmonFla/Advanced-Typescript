import { UserCredentials } from "../Sahred/Model";
import * as Nedb from 'nedb';
import { SessionToken } from "../Server/Model";
export class SessionTokenDBA{

    private nedb: Nedb;

    public constructor(){
        this.nedb = new Nedb('database/SessionToken.db');
        this.nedb.loadDatabase();
    }

    public async storeSessionToken(token: SessionToken): Promise<void>{
        return new Promise((resolve, reject)=>{
            this.nedb.insert(token, (err: Error | null)=>{
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        });
    }
}