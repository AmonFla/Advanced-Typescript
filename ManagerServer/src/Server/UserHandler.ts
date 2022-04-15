import { IncomingMessage, ServerResponse } from "http";
import { HTTP_CODES, HTTP_METHODS } from "../Sahred/Model";
import { UserDBA } from "../User/UsersDBA";
import { BaseRequestHandler } from "./BaseRequestHandler"; 
import { Utils } from "./Utils";

export class UserHandler extends BaseRequestHandler{

    private userDBA: UserDBA = new UserDBA();

    public constructor(req:IncomingMessage, res: ServerResponse){
        super(req,res)
    }

    public async handlerRequest(): Promise<void>{
        switch(this.req.method){
            case HTTP_METHODS.GET:
                await this.handlerGet();
                break;
            default:
                this.handleNotFound();
                break;
        }
    }
     
    private async handlerGet(){
        const parseUrl = Utils.getUrlParameters(this.req.url);
        const a = '';
    }
}