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
        if(parseUrl){
            const userId = parseUrl?.query.id;
            if(userId){
                const user = await this.userDBA.getUserById(userId as string);
                if(user){
                    this.responseJsonObject(HTTP_CODES.OK,user);
                }else{
                    this.handleNotFound()
                }
            }else{
                this.responseBadRequest('userId not present in the request')
            }
        }

        const a = '';
    }
}