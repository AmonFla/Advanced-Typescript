import { SessionToken } from "../models/AuthenticationModel";
import { BaseController } from "./BaseController";

export class DashboardController extends BaseController{

    private sessionToken:SessionToken | undefined;

    public setSessionToken(sessionToken: SessionToken){
        this.sessionToken = sessionToken;
    }

    public createView(): HTMLDivElement {
        const title = this.createElement("h2", "Dashboard Controller")
        if(this.sessionToken){
            this.createElement('label', 
            `welcome ${this.sessionToken.username}`)
        }else{
            this.createElement('label',
            'you don\'t have access rights')
        }
        return this.container;  
    }
}