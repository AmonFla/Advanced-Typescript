import { UserCredentials } from "../Sahred/Model";
import * as Nedb from 'nedb';
export class UserCredentialsDBA{

    private nedb: Nedb;

    public constructor(){
        this.nedb = new Nedb('Database/UserCredentials.db');
        this.nedb.loadDatabase();
    }

    public async putUserCredential(userCredential: UserCredentials): Promise<any>{
        return new Promise((resolve, reject)=>{
            this.nedb.insert(userCredential, (err: Error | null, docs: any)=>{
               if(err){
                   reject()
               }else{
                   resolve(docs)
               }  
            })
        });
    }
    
    public async getUserCredential(username:string, password:string): Promise<UserCredentials | undefined>{
        return new Promise((resolve, reject)=>{
            this.nedb.find({username, password}, (err: Error | null, docs: UserCredentials[])=>{
                if(err){
                    reject(err)
                }else{
                    if(docs.length == 0){
                        resolve(undefined)
                    }else{
                        resolve(docs[0])
                    }
                }
            });
        });
    }
}