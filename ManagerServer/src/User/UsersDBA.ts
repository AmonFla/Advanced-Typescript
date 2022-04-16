import { rejects } from 'assert';
import * as Nedb from 'nedb'; 
import { User } from '../Sahred/Model';


export class UserDBA{

    private nedb: Nedb;

    public constructor(){
        this.nedb = new Nedb('database/Users.db');
        this.nedb.loadDatabase();
    }

    public async putUser(user: User): Promise<void>{
        if(!user.id){
            user.id = this.generateUserId()
        }
        return new Promise((resolve, reject)=>{
            this.nedb.insert(user, (err: Error | null)=>{
                if(err){
                    reject(err)
                }else{
                    resolve()
                }
            })
        });
    }

    public async getUserById(userId:string): Promise<User | undefined>{
        return new Promise((resolve, reject)=>{
            this.nedb.find({id: userId}, (err: Error|null, doc:any[])=>{
                if(err){
                    reject(err)
                }else{
                    if(doc.length == 0){
                        resolve(undefined)
                    }else{
                        resolve(doc[0])
                    }
                }
            })
        });
    }

    public async getUserByName(name:string): Promise<User[]>{
        const regEx = new RegExp(name);
        return new Promise((resolve, reject)=>{
            this.nedb.find({name: regEx}, (err: Error|null, doc:any[])=>{
                if(err){
                    reject(err)
                }else{
                     resolve(doc)
                }
            })
        });
    }

    private generateUserId(){
        return Math.random().toString(36).slice(2);
    }
 
}