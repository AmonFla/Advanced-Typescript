import { IncomingMessage, ServerResponse } from "http";
import { AccessRight, HTTP_CODES, HTTP_METHODS, User } from "../Sahred/Model";
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
            case HTTP_METHODS.PUT:
                await this.handlerPut();
                break;
            case HTTP_METHODS.DELETE:
                await this.handlerDelete();
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
                if(parseUrl?.query.id){
                    const user = await this.userDBA.getUserById(parseUrl?.query.id as string);
                    if(user){
                        this.responseJsonObject(HTTP_CODES.OK,user);
                    }else{
                        this.handleNotFound()
                    }
                }else if(parseUrl?.query.name){
                    const users = await this.userDBA.getUserByName(parseUrl?.query.name as string);
                    this.responseJsonObject(HTTP_CODES.OK,users);
                }else{
                    this.responseBadRequest('userId not present in the request')
                }
            }
        }else{
            this.responseUnauthorized('missing or invalid authentication')
        }
    }

    private async handlerPut(){
        const operationAuthorized = await this.operationAuthorized(AccessRight.CREATE);
        if(operationAuthorized){
            try{
                const user: User = await this.getRequestBody();
                await this.userDBA.putUser(user);
                this.responseText(HTTP_CODES.CREATED, `user ${user.name} created`);
            }catch(error: any){
                this.responseBadRequest(error.message)
            }
        }else{
            this.responseUnauthorized('missing or invalid authentication');
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

    private async handlerDelete(){
        const operationAuthorized = await this.operationAuthorized(AccessRight.DELETE);
        if(operationAuthorized){
            const parseUrl = Utils.getUrlParameters(this.req.url);
            if(parseUrl){ 
                if(parseUrl?.query.id){
                    const deleteResult = await this.userDBA.deleteUser(parseUrl?.query.id as string);
                    if(deleteResult){
                        this.responseText(HTTP_CODES.OK,`user ${parseUrl?.query.id} deleted`);
                    }else{
                        this.handleNotFound(`user ${parseUrl?.query.id} was not deleted`)
                    }               
                }else{
                    this.responseBadRequest('userId not present in the request')
                }
            }
        }else{
            this.responseUnauthorized('missing or invalid authentication')
        }
        
    }
}