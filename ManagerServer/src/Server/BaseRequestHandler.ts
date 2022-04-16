import { IncomingMessage, ServerResponse } from "http";
import { HTTP_CODES } from "../Shared/Model";

export abstract class BaseRequestHandler{
    
    protected req: IncomingMessage;
    protected res: ServerResponse;

    public constructor(req:IncomingMessage, res:ServerResponse){
        this.req = req;
        this.res = res; 
    
    }
    
    abstract handlerRequest(): Promise<void>

   

    protected async getRequestBody(): Promise<any>{
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

    protected responseJsonObject(code:HTTP_CODES, object: any){ 
        this.res.writeHead(code, {'Content-Type':'application/json'});
        this.res.write(JSON.stringify(object));   
    }

    protected async handleNotFound(message: string = 'not found') {
        this.responseText(HTTP_CODES.NOT_FOUND,message);        
    }

    protected responseBadRequest(message: string){
        this.responseText(HTTP_CODES.BAD_REQUEST,message)
    }

    protected responseUnauthorized(message: string){
        this.responseText(HTTP_CODES.UNAUTHORIZED,message)
    }

    protected responseText(code:HTTP_CODES,message: string){
        this.res.statusCode = code,
        this.res.write(message)
    }


}