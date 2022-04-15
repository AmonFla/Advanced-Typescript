import { on } from "events";
import { IncomingMessage, ServerResponse } from "http";
import { Account, Handler } from "./Model";

export class LoginHandler implements Handler{

    private req: IncomingMessage;
    private res: ServerResponse;

    public constructor(req:IncomingMessage, res:ServerResponse){
        this.req = req;
        this.res = res;
    
    }

    public async handlerRequest():Promise<void>{
        const body = await this.getRequestBody(); 
    }

    private async getRequestBody(): Promise<Account>{
        return new Promise((resolve, reject)=>{
            let body = '';
            this.req.on('data', (data:string)=>{
                body += data
            }) 
            this.req.on('end', ()=> {
                try{
                    resolve(JSON.parse(body));
                }catch(error){
                    reject(error);
                }
            });
            this.req.on('error',(error:any)=>{
                reject(error);
            })
        });
    }


}