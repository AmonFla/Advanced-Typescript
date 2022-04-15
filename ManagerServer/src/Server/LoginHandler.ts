import { IncomingMessage, ServerResponse } from "http";
import { HTTP_CODES, HTTP_METHODS } from "../Sahred/Model";
import { BaseRequestHandler } from "./BaseRequestHandler";
import { Account,  TokenGenerator } from "./Model";

export class LoginHandler extends BaseRequestHandler{

    
    private tokenGenerator: TokenGenerator;

    public constructor(req:IncomingMessage, res:ServerResponse, tokenGenerator: TokenGenerator){
        super(req,res)
        this.tokenGenerator = tokenGenerator;
    }

    public async handlerRequest():Promise<void>{
        switch(this.req.method){
            case HTTP_METHODS.POST:
                await this.handlePost();
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