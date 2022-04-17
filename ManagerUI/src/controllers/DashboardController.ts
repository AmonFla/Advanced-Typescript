import { AccessRight, SessionToken } from "../models/AuthenticationModel";
import { BaseController } from "./BaseController";

export class DashboardController extends BaseController{

    private sessionToken:SessionToken | undefined;
    private searchArea:HTMLInputElement | undefined;
    private sarchResultArea:HTMLDivElement | undefined;

    public setSessionToken(sessionToken: SessionToken){
        this.sessionToken = sessionToken;
    }

    public createView(): HTMLDivElement {
        const title = this.createElement("h2", "Dashboard Controller")
        if(this.sessionToken){
            this.createElement('label', 
            `welcome ${this.sessionToken.username}`)
            this.insertBreak();
            this.generateButtons();
        }else{
            this.createElement('label',
            'you don\'t have access rights')
        }
        return this.container;  
    }

    private generateButtons(){
        if(this.sessionToken){
            for (const access of this.sessionToken.accessRight){
                this.createElement("button",AccessRight[access], async ()=>{ 
                    this.triggerAction(access);
                });
            }
        }

        if(this.sessionToken?.accessRight.includes(AccessRight.READ)){
            this,this.insertBreak();
            this.createElement("label", "Search");
            this.searchArea = this.createElement("input")
            this.sarchResultArea = this.createElement("div")
        }
    }

    private async triggerAction(access: AccessRight){
        switch (access) {
            case AccessRight.READ:
                this.sarchResultArea?.innerText =  this.searchArea?.innerText
                break;
        
            default:
                break;
        }

    }
}