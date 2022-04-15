import { IncomingMessage, ServerResponse } from "http";
import { AccessRight, HTTP_CODES, HTTP_METHODS } from "../Sahred/Model";
import { UserDBA } from "../User/UsersDBA";
import { BaseRequestHandler } from "./BaseRequestHandler"; 
import { TokenValidator } from "./Model";
import { Utils } from "./Utils";

export class UserHandler extends BaseRequestHandler{

    private userDBA: UserDBA = new UserDBA();
    private tokenVal: TokenValidator ;

    public constructor(req:IncomingMessage, res: ServerResponse, tokenVal: TokenValidator){
        super(req,res)
        this.tokenVal = tokenVal

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
        const operationAuthorized = await this.operationAuthorized(AccessRight.READ);
        if(operationAuthorized){
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
        }else{
            this.responseUnauthorized('missing or invalid authentication')
        }
    }

    private async operationAuthorized(operation: AccessRight): Promise<boolean>{
        const tokenId = this.req.headers.authorization;
        if(tokenId){
            const tokenRight = await this.tokenVal.validateToken(tokenId);
            if(tokenRight.accessRight.includes(operation)){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}