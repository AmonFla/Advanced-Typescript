import { IncomingMessage, ServerResponse } from "http";
import { AccessRight, HTTP_CODES, HTTP_METHODS, User } from "../Shared/Model";
import { countInstances } from "../Shared/ObjectCounter";
import { UserDBA } from "../User/UsersDBA";
import { BaseRequestHandler } from "./BaseRequestHandler"; 
import { TokenValidator } from "./Model";
import { Utils } from "./Utils";

@countInstances
export class UserHandler extends BaseRequestHandler{

    private userDBA: UserDBA = new UserDBA();
    private tokenVal: TokenValidator ;

    public constructor(tokenVal: TokenValidator, req?:IncomingMessage, res?: ServerResponse ){
            super({} as any,{} as any)
        this.tokenVal = tokenVal

    }

    public setRequest(req:IncomingMessage){
        this.req = req
    }

    public setResponse(res:ServerResponse){
        this.res = res;
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
            case HTTP_METHODS.OPTIONS:
                this.res.writeHead(HTTP_CODES.OK)
                break;
            default:
                this.handleNotFound();
                break;
        }
    }
     
    private async handlerGet(){
        const operationAuthorized = await this.operationAuthorized(AccessRight.READ);
        if(operationAuthorized){
            const parseUrl = Utils.getUrlParameters(this.req.url, `http://${this.req.headers.host}`);
            if(parseUrl){ 
                if(parseUrl.searchParams.get('id')){
                    const user = await this.userDBA.getUserById(parseUrl.searchParams.get('id') as string);
                    if(user){
                        this.responseJsonObject(HTTP_CODES.OK,user);
                    }else{
                        this.handleNotFound()
                    }
                }else if(parseUrl.searchParams.get('name')){
                    const users = await this.userDBA.getUserByName(parseUrl.searchParams.get('name') as string);
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
            const parseUrl = Utils.getUrlParameters(this.req.url,`http://${this.req.headers.host}`);
            if(parseUrl){ 
                if(parseUrl.searchParams.get('id')){
                    const deleteResult = await this.userDBA.deleteUser(parseUrl.searchParams.get('id')as string);
                    if(deleteResult){
                        this.responseText(HTTP_CODES.OK,`user ${parseUrl.searchParams.get('id')} deleted`);
                    }else{
                        this.handleNotFound(`user ${parseUrl.searchParams.get('id')} was not deleted`)
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