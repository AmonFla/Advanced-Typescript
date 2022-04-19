import { UserCredentials } from "../Shared/Model";
import * as Nedb from 'nedb';
import { delayResponse } from "../Shared/MethodDecorators";
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
    
    @delayResponse(5000)
    public async getUserCredential(username:string, password:string): Promise<UserCredentials | undefined>{
        return new Promise((resolve, reject)=>{
            this.nedb.find({username, password}, (err: Error | null, docs: UserCredentials[])=>{
                if(err){
                    reject(err)
                }else{
                    if(docs.length == 0){
                        resolve(undefined)
                    }else{
                        console.log('method excecuted');
                        resolve(docs[0])
                    }
                }
            });
        });
    }
}