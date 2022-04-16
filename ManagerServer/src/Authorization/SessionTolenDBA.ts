import { UserCredentials } from "../Shared/Model";
import * as Nedb from 'nedb';
import { SessionToken } from "../Server/Model"; 
export class SessionTokenDBA{

    private nedb: Nedb;

    public constructor(){
        this.nedb = new Nedb('Database/SessionToken.db');
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

    public async getSessionToken(tokenId: string): Promise<SessionToken|undefined>{
        return new Promise((resolve, reject)=>{
            this.nedb.find({tokenId},(err: Error | null, doc: any[])=>{
                if(err){
                    reject(err)
                }else{
                    if(doc.length == 0){
                        resolve(undefined)
                    }else{
                        resolve(doc[0])
                    }
                }
            });
        });
    }
}