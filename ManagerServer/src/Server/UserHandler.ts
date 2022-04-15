import { IncomingMessage, ServerResponse } from "http";
import { HTTP_CODES, HTTP_METHODS } from "../Sahred/Model";
import { UserDBA } from "../User/UsersDBA";
import { Handler } from "./Model";
import { Utils } from "./Utils";

export class UserHandler implements Handler{

    private req: IncomingMessage;
    private res: ServerResponse;
    private userDBA: UserDBA = new UserDBA();

    public constructor(req:IncomingMessage, res:ServerResponse){
        this.req = req;
        this.res = res; 
    
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
    

    private async handleNotFound() {
        this.res.statusCode = HTTP_CODES.NOT_FOUND;
        this.res.write('not found');        
    }

    private async handlerGet(){
        const parseUrl = Utils.getUrlParameters(this.req.url);
        const a = '';
    }
}