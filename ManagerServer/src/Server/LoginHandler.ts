import { IncomingMessage, ServerResponse } from "http";
import { HTTP_CODES, HTTP_METHODS } from "../Shared/Model";
import { countInstances } from "../Shared/ObjectCounter";
import { BaseRequestHandler } from "./BaseRequestHandler";
import { Account,  TokenGenerator } from "./Model";

@countInstances
export class LoginHandler extends BaseRequestHandler{

    
    private tokenGenerator: TokenGenerator;

    public constructor(tokenGenerator: TokenGenerator, req?:IncomingMessage, res?:ServerResponse){
        super({} as any,{} as any)
        this.tokenGenerator = tokenGenerator;
    }

    public setRequest(req:IncomingMessage){
        this.req = req
    }

    public setResponse(res:ServerResponse){
        this.res = res;
    }

    public async handlerRequest():Promise<void>{
        switch(this.req.method){
            case HTTP_METHODS.POST:
                await this.handlePost();
                break;
            case HTTP_METHODS.OPTIONS:
                this.res.writeHead(HTTP_CODES.OK)
                break;
            default:
                this.handleNotFound();
                break;
        }

    }

    private async handlePost(){
        try{
            const body: Account = await this.getRequestBody(); 
            const sessionToken = await this.tokenGenerator.generateToken(body);
            if (sessionToken){
                this.responseJsonObject(HTTP_CODES.CREATED, sessionToken);
            }else{
                this.handleNotFound('wrong credentials');
            }
        }catch(error: any ){
            this.res.write('error:'+ error.message)
        }
    }

   




}